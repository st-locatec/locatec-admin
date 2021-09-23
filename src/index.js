import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./stores";
import { PersistGate } from "redux-persist/integration/react";

// Provider와 PersistGate에 연동할 store와 persistor 가져오기
const { store, persistor } = configureStore();

ReactDOM.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <App />
      </PersistGate>
   </Provider>,
   document.getElementById("root")
);
