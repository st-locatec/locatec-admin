import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import CustomDrawer from "../components/dashbord/CustomDrawer";
import { connect } from "react-redux";
import CustomToolbar from "../components/dashbord/CustomToolbar";
import Home from "./Home";

function Main({ isLogined, history }) {
   // 좌측 drawer을 열지 말지 결정하는 상태
   const [open, setOpen] = React.useState(true);

   // 여는 버튼 눌렀을때 호출되는 콜백
   const handleDrawerOpen = () => {
      setOpen(true);
   };
   // 닫는 버튼 눌렀을때 호출되는 콜백
   const handleDrawerClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      // 아래에 해당하는 기기이면 drawer 닫은 상태로 초기 렌더하기
      if (
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
         )
      ) {
         setOpen(false);
      }
   }, []);

   useEffect(() => {
      // 로그인 되어있지 않으면 로그인 화면으로 이동시키기
      if (!isLogined) {
         history.push("/");
      }
   }, [isLogined, history]);

   return (
      <div
         style={{
            display: "flex",
         }}>
         <CssBaseline />
         <CustomToolbar open={open} handleDrawerOpen={handleDrawerOpen} />
         <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
         <Home />
      </div>
   );
}

// 리덕스 상태를 가져오기 위한 함수
function mapStateToProps(state) {
   return {
      isLogined: state.loginReducer.isLogined,
   };
}

// 현재 element를 리덕스와 연결시키서 export
export default connect(mapStateToProps)(Main);
