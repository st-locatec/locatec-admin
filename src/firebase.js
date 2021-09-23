/**
 * 파이어베이스 초기화
 */

import firebase from "firebase/app";
import "firebase/auth";

// 키, id 등 가져오기
var firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APP_ID,
};

// 가져온 키, id로 파이어베이스 초기화
firebase.initializeApp(firebaseConfig);

export const fb = firebase;
export const fbAuth = firebase.auth();
