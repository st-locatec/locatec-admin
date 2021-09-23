/**
 * 로그인 처리 element
 */

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { fbAuth } from "../../firebase";
import styled from "styled-components";
import { connect } from "react-redux";
import { logined } from "../../stores/loginState";

// styled-component로 ErrorMessage 스타일 적용
const ErrorMessege = styled.div`
   padding-left: 10px;
   color: red;
`;

// 스타일
const useStyles = makeStyles((theme) => ({
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
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

function Auth({ onLogined }) {
   const history = useHistory(); // 브라우저 history 객체 가져오기
   const [email, setEmail] = useState(""); // 유저가 입력한 이메일 상태
   const [pw, setPw] = useState(""); // 유저가 입력한 비밀번호 상태
   const [errMsg, setErrMsg] = useState(""); // 에러메세지 상태
   const [rememberMe, setRememberMe] = useState(false); // 자동로그인 체크여부 상태
   const classes = useStyles(); // 위에서 선언한 스타일 가져오리

   // 인증 에러 핸들링
   const errorHandle = (err) => {
      if (err.code === "auth/user-not-found") {
         setErrMsg("가입되지 않은 이메일입니다.");
      } else if (err.code === "auth/invalid-email") {
         setErrMsg("이메일 형식을 지켜주세요.");
      } else if (err.code === "auth/wrong-password") {
         setErrMsg("잘못된 비밀번호 입니다.");
      } else if (err.code === "auth/weak-password") {
         setErrMsg("비밀번호는 최소 6자 이상이어야 합니다.");
      } else if (err.code === "auth/email-already-in-use") {
         setErrMsg("이미 사용중인 이메일입니다.");
      } else if (err.code === "auth/user-disabled") {
         setErrMsg("차단된 회원입니다.");
      } else {
         setErrMsg(err.message);
      }
   };

   // 파이어베이스 auth 를 사용하여 로그인
   const login = () => {
      fbAuth
         .signInWithEmailAndPassword(email, pw)
         .then((user) => {
            onLogined(user.user.uid);
            setEmail("");
            setPw("");
            history.push("/main");
         })
         .catch((error) => {
            errorHandle(error);
         });
   };

   // 자동로그인을 누르고 로그인했는지 확인하여 적절히 로그인하기
   const onLoginCheckIsRememberMe = () => {
      if (rememberMe) {
         fbAuth.setPersistence("local").then(() => {
            return login();
         });
      } else {
         login();
      }
   };

   // 로그인 버튼 클릭시 호출
   const onClick = (e) => {
      e.preventDefault();
      onLoginCheckIsRememberMe();
   };

   // 입력 처리 콜백함수
   const onChangeEmail = (e) => {
      setEmail(e.target.value);
   };
   const onChangePw = (e) => {
      setPw(e.target.value);
   };

   return (
      <div className={classes.paper}>
         <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
            로그인
         </Typography>
         <form className={classes.form} noValidate>
            <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               label="Email Address"
               name="email"
               autoComplete="email"
               value={email}
               onChange={onChangeEmail}
               autoFocus
            />
            <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               name="password"
               label="Password"
               type="password"
               id="password"
               value={pw}
               onChange={onChangePw}
               autoComplete="current-password"
            />
            <ErrorMessege>{errMsg}</ErrorMessege>
            <FormControlLabel
               control={
                  <Checkbox
                     value={rememberMe}
                     color="primary"
                     onChange={() => setRememberMe((prev) => !prev)}
                  />
               }
               label="자동로그인"
            />
            <Button
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={onClick}>
               로그인
            </Button>
         </form>
      </div>
   );
}

// 리덕스 action을 가져오기 위한 함수
function mapDispatchToProps(dispatch) {
   return {
      onLogined: (uid) => dispatch(logined(uid)),
   };
}

// 현재 element를 리덕스와 연결시키서 export
export default connect(null, mapDispatchToProps)(Auth);
