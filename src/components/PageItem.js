/**
 * 한 요청의 데이터를 보여주는 곳
 * 위도 경도를 지도에 보여주고, 등록한 사진이 있으면 보여준다.
 */
import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import MapWrap from "./elements/MapWrap";

// 스타일
const useStyles = makeStyles(() => ({
   button: {
      maxWidth: "100px",
      margin: "10px 0px",
      float: "left",
   },
   goPage: {
      margin: "10px 0px",
      lineHeight: "36px",
      fontSize: "15px",
      textAlign: "center",
   },
}));

function PageItem({ page }) {
   const classes = useStyles(); // 위에서 선언한 스타일
   const history = useHistory(); // 브라우저 history 객체 가져오기

   return (
      <>
         <div>
            <Button
               variant="contained"
               color="primary"
               onClick={() => history.push("/main")}
               className={classes.button}>
               뒤로가기
            </Button>
         </div>
         <MapWrap coords={page?.coords} />
         <img
            src={page?.image}
            alt="error"
            style={{ width: 400, height: 300 }}
         />
      </>
   );
}
export default PageItem;
