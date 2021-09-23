import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./routes/Login";
import Main from "./routes/Main";

// 라우터 연동
// 가장 초기화면은 로그인화면. 인증이 됐을 경우 main으로 이동한다.
function App() {
   return (
      <Router>
         <Route exact path="/" component={Login} />
         <Route path="/main" component={Main} />
      </Router>
   );
}

export default App;
