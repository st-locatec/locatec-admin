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
import React from "react";
import { useHistory } from "react-router";
import mapLocTypeToStr from "../utils/mapLocTypeToStr";

function PageList({ list, setLoading, uid, setPage, setRefresh }) {
   const history = useHistory();
   const onClick = async (item) => {
      setLoading(true);
      setPage(item);
      history.push("/main/pageitem");
      setLoading(false);
   };
   const onApprove = async (item) => {
      setLoading(true);
      if (window.confirm("허가하시겠습니까?")) {
      }
      setLoading(false);
   };
   const onDecline = async (item) => {
      setLoading(true);
      if (window.confirm("거부하시겠습니까?")) {
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
