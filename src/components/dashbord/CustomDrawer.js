/**
 * 메인화면에서 좌측 drawer
 */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import { useHistory } from "react-router";

export const drawerWidth = 240; // drawer 너비.

// 스타일
const useStyles = makeStyles((theme) => ({
   drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
         width: theme.spacing(9),
      },
   },
   toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
   },
}));

export default function CustomDrawer({ open, handleDrawerClose }) {
   const classes = useStyles(); // 위에서 선언한 스타일
   const history = useHistory(); // 브라우저 history 객체 가져오기
   return (
      <>
         <Drawer
            variant="permanent"
            classes={{
               paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
               ),
            }}
            open={open}>
            <div className={classes.toolbarIcon}>
               <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
               </IconButton>
            </div>
            <Divider />
            <List>
               <ListItem button onClick={() => history.push("/main")}>
                  <ListItemIcon>
                     <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="홈" />
               </ListItem>
            </List>
         </Drawer>
      </>
   );
}
