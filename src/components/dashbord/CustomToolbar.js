/**
 * 메인화면에서 보이는 상단의 툴바 element
 */
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { drawerWidth } from "./CustomDrawer";
import { connect } from "react-redux";
import { logout } from "../../stores/loginState";
import { fbAuth } from "../../firebase";

// 스타일
const useStyles = makeStyles((theme) => ({
   toolbar: {
      paddingRight: 24,
   },
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   menuButton: {
      marginRight: 36,
   },
   menuButtonHidden: {
      display: "none",
   },
   title: {
      flexGrow: 1,
   },
}));

function CustomToolbar({ open, handleDrawerOpen, onLogout }) {
   const classes = useStyles(); // 위에서 선언한 스타일

   // 좌측상단 버튼 눌렀을때 호출
   const logout = () => {
      fbAuth.signOut();
      onLogout();
   };

   return (
      <>
         <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
               <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                     classes.menuButton,
                     open && classes.menuButtonHidden
                  )}>
                  <MenuIcon />
               </IconButton>
               <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}>
                  LocateC admin
               </Typography>
               <IconButton color="inherit" onClick={logout}>
                  <ExitToAppIcon fontSize="large" />
               </IconButton>
            </Toolbar>
         </AppBar>
      </>
   );
}

// 리덕스 action을 가져오기 위한 함수
function mapDispatchToProps(dispatch) {
   return {
      onLogout: () => dispatch(logout()),
   };
}

// 현재 element를 리덕스와 연결시키서 export
export default connect(null, mapDispatchToProps)(CustomToolbar);
