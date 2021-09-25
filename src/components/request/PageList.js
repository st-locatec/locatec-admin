// 요청 리스트 렌더
import React from "react";
import {
   Divider,
   IconButton,
   List,
   ListItem,
   ListItemSecondaryAction,
   ListItemText,
   Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useHistory } from "react-router";
import mapLocTypeToStr from "../../utils/mapLocTypeToStr";
import { REQUEST_ITEM } from "../../constants/Link";

function PageList({ list, setLoading, setItem, setRefresh }) {
   const history = useHistory(); // 브라우저 history 객체 가져오기

   // 요청 클릭시 그 요청의 데이터를 page 상태에 넣고, pageItem으로 이동
   const onClick = async (item) => {
      setLoading(true);
      setItem(item);
      history.push(REQUEST_ITEM);
      setLoading(false);
   };

   // 허가 눌렀을 시 호출
   const onApprove = async (item) => {
      setLoading(true);
      // 한번 더 확인
      if (window.confirm("허가하시겠습니까?")) {
         setRefresh((prev) => prev + 1);
      }
      setLoading(false);
   };

   // 거부 눌렀을 시 호출
   const onDecline = async (item) => {
      setLoading(true);
      // 한번 더 확인
      if (window.confirm("거부하시겠습니까?")) {
         setRefresh((prev) => prev + 1);
      }
      setLoading(false);
   };

   return (
      <>
         <Typography component="h2" variant="h6" color="primary" gutterBottom>
            요청 리스트
         </Typography>
         <List component="nav" aria-label="main mailbox folders">
            {list.length === 0 ? (
               <>
                  <ListItem>
                     <ListItemText primary="요청이 없습니다." />
                  </ListItem>
                  <Divider />
               </>
            ) : (
               list.map((item, idx) => {
                  return (
                     <>
                        <ListItem
                           id={idx}
                           key={idx}
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
                                 <AddIcon />
                              </IconButton>
                              <IconButton
                                 edge="end"
                                 aria-label="decline"
                                 onClick={() => onDecline(item)}>
                                 <RemoveIcon />
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
export default PageList;
