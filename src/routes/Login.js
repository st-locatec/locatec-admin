/**
 * 로그인 화면
 */

import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../components/auth/Auth";
import pic from "../mainImage.png";
import { fbAuth } from "../firebase";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { logined } from "../stores/loginState";

// 상태들
const useStyles = makeStyles((theme) => ({
   root: {
      height: "100vh",
   },
   image: {
      backgroundImage: `url(${pic})`,
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
      backgroundSize: "contain",
      backgroundPosition: "center",
   },
   paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%",
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   img: {
      width: "100%",
      height: "auto",
   },
}));

function Login({ onLogined, isLogined }) {
   const classes = useStyles();
   const history = useHistory();

   useEffect(() => {
      // 유저의 인증상태가 변하는 걸 트래킹하는 이벤트 등록.
      // 인증된다면 main 화면으로 이동시킨다.
      // 자동로그인을 하고 로그인한적이 있다면, 맨처음에 아래코드가 실행되면서 인증을 한다.
      if (!isLogined) {
         fbAuth.onAuthStateChanged((user) => {
            if (user) {
               onLogined(user.uid);
               return history.push("/main/request");
            }
         });
      }
   }, [history, onLogined, isLogined]);

   return (
      <Grid container component="main" className={classes.root}>
         <CssBaseline />
         <Grid item xs={12} sm={8} md={9} className={classes.image} />
         <Grid
            item
            xs={false}
            sm={4}
            md={3}
            component={Paper}
            elevation={6}
            square>
            <Auth />
         </Grid>
      </Grid>
   );
}

// 리덕스 action을 가져오기 위한 함수
function mapDispatchToProps(dispatch) {
   return {
      onLogined: (uid) => dispatch(logined(uid)),
   };
}
// 리덕스 상태를 가져오기 위한 함수
function mapStateToProps(state) {
   return {
      isLogined: state.loginReducer.isLogined,
   };
}
// 현재 element를 리덕스와 연결시키서 export
export default connect(mapStateToProps, mapDispatchToProps)(Login);
