import { createReducer } from "@reduxjs/toolkit";

// 액션 타입
const LOGINED = "LOGINED";
const LOGOUT = "LOGOUT";

// 액션 함수
export const logined = (uid) => ({ type: LOGINED, uid });
export const logout = () => ({ type: LOGOUT });

// reducer
const loginReducer = createReducer(
   { isLogined: false, uid: "" },
   {
      [LOGINED]: (state, action) => ({
         isLogined: true,
         uid: action.uid,
      }),
      [LOGOUT]: () => ({ isLogined: false }),
   }
);

export default loginReducer;
