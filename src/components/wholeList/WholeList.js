// 요청 리스트 렌더
import React from "react";
import {
   Button,
   Divider,
   IconButton,
   List,
   ListItem,
   ListItemSecondaryAction,
   ListItemText,
   Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import mapLocTypeToStr from "../../utils/mapLocTypeToStr";
import { WHOLELIST_ITEM } from "../../constants/Link";

function WholeList({ list, setLoading, setItem, setRefresh }) {
   const history = useHistory(); // 브라우저 history 객체 가져오기

   // 요청 클릭시 그 요청의 데이터를 page 상태에 넣고, pageItem으로 이동
   const onClick = async (item) => {
      setItem({ item, isMutation: false });
      history.push(WHOLELIST_ITEM);
   };

   // 수정 눌렀을 시 호출
   const onApprove = async (item) => {
      // 한번 더 확인
      if (window.confirm("수정하시겠습니까?")) {
         setItem({ item, isMutation: true });
         history.push(WHOLELIST_ITEM);
      }
   };

   // 삭제 눌렀을 시 호출
   const onDecline = async (item) => {
      setLoading(true);
      // 한번 더 확인
      if (window.confirm("삭제하시겠습니까?")) {
         setRefresh((prev) => prev + 1);
      }
      setLoading(false);
   };

   return (
      <>
         <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
               component="h2"
               variant="h6"
               color="primary"
               gutterBottom>
               전체 리스트
            </Typography>

            <Button
               variant="contained"
               color="primary"
               onClick={() => {
                  history.push(WHOLELIST_ITEM);
                  setItem({ item: null, isMutation: true });
               }}
               style={{
                  maxWidth: "100px",
               }}>
               생성
            </Button>
         </div>
         <List component="nav" aria-label="main mailbox folders">
            {list.length === 0 ? (
               <>
                  <ListItem>
                     <ListItemText primary="아이템이 없습니다." />
                  </ListItem>
                  <Divider />
               </>
            ) : (
               list.map((item, idx) => {
                  return (
                     <>
                        <ListItem
                           id={idx}
                           key={`wholelist_${idx}`}
                           button
                           onClick={() => onClick(item)}>
                           <ListItemText
                              primary={`위도 : ${item.coords.latitude}, 경도 : ${item.coords.longitude}`}
                              secondary={mapLocTypeToStr(item.type)}
                           />
                           <ListItemSecondaryAction>
                              <IconButton
                                 edge="end"
                                 aria-label="approve"
                                 onClick={() => onApprove(item)}>
                                 <EditIcon />
                              </IconButton>
                              <IconButton
                                 edge="end"
                                 aria-label="decline"
                                 onClick={() => onDecline(item)}>
                                 <DeleteIcon />
                              </IconButton>
                           </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                     </>
                  );
               })
            )}
         </List>
      </>
   );
}
export default WholeList;
