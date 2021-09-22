import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import MapWrap from "./elements/MapWrap";
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
   const classes = useStyles();
   const history = useHistory();
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
