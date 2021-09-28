/**
 * 한 요청의 데이터를 보여주는 곳
 * 위도 경도를 지도에 보여주고, 등록한 사진이 있으면 보여준다.
 */
import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { WHOLELIST } from "../../constants/Link";
import MapWrap from "../elements/MapWrap";
import { locationTypeArray, SMOKE } from "../../constants/types";
import mapLocTypeToStr from "../../utils/mapLocTypeToStr";
import { updateWholeListItemApi } from "../../api/wholeList";
import { getBase64FromUrl } from "../../utils/getBase64Image";

// 스타일
const useStyles = makeStyles(() => ({
   topButton: {
      display: "flex",
      justifyContent: "space-between",
   },
   button: {
      maxWidth: "100px",
      margin: "10px 0px",
   },
   goPage: {
      margin: "10px 0px",
      lineHeight: "36px",
      fontSize: "15px",
      textAlign: "center",
   },
}));

function WholeListItem({ item, setLoading, setRefresh }) {
   const classes = useStyles(); // 위에서 선언한 스타일
   const history = useHistory(); // 브라우저 history 객체 가져오기
   const [curItem, setCurItem] = useState();
   const [isEdit, setIsEdit] = useState(false);
   const [anchorEl, setAnchorEl] = useState();
   const photoAddBtnRef = useRef();

   // edit 일 경우 item이 넘어왔으므로, item으로 초기화
   // 아니면 생성이므로, 기본상태로 초기화
   useEffect(() => {
      if (item) {
         setCurItem(item);
         setIsEdit(true);
      } else {
         setCurItem({
            type: SMOKE,
            coords: {
               latitude: 37.63232307069136,
               longitude: 127.07801836259382,
            },
            image: "",
         });
      }
   }, [item]);

   console.log(curItem);
   // 수정 또는 생성 요청 보내기
   const onPressComplete = async () => {
      setLoading(true);
      if (window.confirm(`${isEdit ? "수정" : "생성"}요청을 보내겠습니까?`)) {
         try {
            if (isEdit) {
               let obj = {
                  productId: curItem.id,
                  latitude: curItem.coords.latitude,
                  longitude: curItem.coords.longitude,
                  type: curItem.type,
                  image: curItem.image,
               };

               // 사진 변경안됐으면 url 을 base64로 바꾸기
               if (curItem.image && curItem.image.startsWith("https://")) {
                  const res = await getBase64FromUrl(curItem.image);
                  obj.image = res;
               }
               // base64에서 앞에 빼기

               await updateWholeListItemApi({
                  ...obj,
                  image: obj.image.substring(obj.image.indexOf(",") + 1),
               });
            } else {
            }
            setRefresh((prev) => prev + 1);
            history.push(WHOLELIST);
         } catch (e) {
            console.log(e.response);
         }
      }
      setLoading(false);
   };

   // 타입 선택 함수
   const onClickLocationType = (type) => {
      setCurItem((prev) => ({ ...prev, type: type }));
      setAnchorEl(null);
   };

   // 지도 클릭시 마커 이동
   const onClickMap = ({ latLng }) => {
      setCurItem((prev) => ({
         ...prev,
         coords: { latitude: latLng.lat(), longitude: latLng.lng() },
      }));
   };

   // 이미지 등록 버튼 눌렀을때
   const onClickAddPhoto = () => {
      photoAddBtnRef.current?.click();
   };

   // 이미지 등록 콜백
   const photoChange = (e) => {
      e.preventDefault();
      let reader = new FileReader();

      reader.onloadend = () => {
         // 2. 읽기가 완료되면 아래코드가 실행
         const base64 = reader.result;
         if (base64) {
            setCurItem((prev) => ({
               ...prev,
               image: base64,
            }));
         }
      };
      if (e.target.files[0]) {
         reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장
      }
   };

   return (
      <>
         <div className={classes.topButton}>
            <Button
               variant="contained"
               color="primary"
               onClick={() => history.push(WHOLELIST)}
               className={classes.button}>
               뒤로가기
            </Button>
            <Button
               variant="contained"
               color="primary"
               onClick={onPressComplete}
               className={classes.button}>
               완료
            </Button>
         </div>
         <div>
            <Button
               color="primary"
               onClick={(e) => setAnchorEl(e.currentTarget)}
               className={classes.button}>
               {mapLocTypeToStr(curItem?.type)}
            </Button>
            <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={() => setAnchorEl(null)}>
               {locationTypeArray?.map((item, idx) => {
                  return (
                     <MenuItem
                        key={`menuitem_${idx}`}
                        onClick={() => onClickLocationType(item)}>
                        {mapLocTypeToStr(item)}
                     </MenuItem>
                  );
               })}
            </Menu>
         </div>
         <MapWrap coords={curItem?.coords} onClick={onClickMap} />
         <div>
            {curItem?.image && (
               <img
                  src={curItem?.image}
                  alt="error"
                  style={{ width: 400, height: 300 }}
               />
            )}
            <br />
            <Button
               variant="contained"
               color="primary"
               onClick={onClickAddPhoto}>
               이미지 등록
            </Button>
            <input
               ref={photoAddBtnRef}
               type="file"
               accept="image/*"
               style={{ display: "none" }}
               onChange={photoChange}
            />
         </div>
      </>
   );
}
export default WholeListItem;
