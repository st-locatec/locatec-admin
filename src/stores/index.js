import { combineReducers, createStore } from "redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage/session";

import loginReducer from "./loginState";

const persistConfig = {
   key: "root",
   storage,
};

// 리듀서 합치기
const rootReducer = combineReducers({
   loginReducer,
});

// 새로고침을 해도 인증상태가 유지되도록 persistReducer에 연결
const enhancedReducer = persistReducer(persistConfig, rootReducer);

// 스토어와 persistGate에 연동을 위한 persistor를 리턴하는 함수 export
export default function configureStore() {
   const store = createStore(enhancedReducer);
   const persistor = persistStore(store);
   return { store, persistor };
}
