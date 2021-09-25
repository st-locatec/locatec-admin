/**
 * 홈 화면
 */
import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { CircularProgress, makeStyles, Modal, Paper } from "@material-ui/core";
import clsx from "clsx";
import { Route } from "react-router";
import PageList from "../components/request/PageList";
import PageItem from "../components/request/PageItem";
import { SMOKE, TRASHCAN } from "../constants/types";
import WholeList from "../components/wholeList/WholeList";
import WholeListItem from "../components/wholeList/WholeListItem,";
import {
   REQUEST,
   REQUEST_ITEM,
   WHOLELIST,
   WHOLELIST_ITEM,
} from "../constants/Link";

// 스타일들
const useStyles = makeStyles((theme) => ({
   paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
   },
   fixedHeight: {
      height: "100%",
   },
   content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
   },
   container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
   },

   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
   appBarSpacer: theme.mixins.toolbar,
}));

export const locate = [
   {
      type: SMOKE,
      coords: { latitude: 37.63044345539538, longitude: 127.08030519717333 },
      image: "http://res.heraldm.com/content/image/2018/10/26/20181026000211_1.jpg",
   },
   {
      type: TRASHCAN,
      coords: { latitude: 37.631641503858894, longitude: 127.07599220544165 },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Plastic_bag_trashcan_Paris_Vigipirate_dsc00718.jpg/300px-Plastic_bag_trashcan_Paris_Vigipirate_dsc00718.jpg",
   },
   {
      type: SMOKE,
      coords: { latitude: 37.632321239093024, longitude: 127.08005306956865 },
      image: "http://www.canews.kr/news/photo/201812/1506_2165_5243.jpg",
   },
   {
      type: TRASHCAN,
      coords: { latitude: 37.63228300416612, longitude: 127.07488713527131 },
      image: "https://lh3.googleusercontent.com/proxy/gC8lriQijY4BOP-prOqQ0gOM1-5XbACoG1LrjiWbyhGuYGz8id1PvQ_eT8svMv4IbEcyUFn8UajPipPYfI4iIl-dg6JMCTPgGBO9ZzuxcPgRu7W0OlqypiMYYwBQdp0b1e2CYWTnWKDsywG6krYQ77o",
   },
   {
      type: SMOKE,
      coords: { latitude: 37.63096176242126, longitude: 127.07598147648531 },
      image: "https://m.wjbstec.com/web/product/big/201908/cc4a2e6f1ce9c3375558d2cc957c6cb2.jpg",
   },
   {
      type: TRASHCAN,
      coords: { latitude: 37.63323887178819, longitude: 127.08091674090888 },
      image: "http://img.danawa.com/prod_img/500000/172/030/img/13030172_1.jpg?shrink=330:330&_v=20201229170958",
   },
   {
      type: SMOKE,
      coords: { latitude: 37.62952578817334, longitude: 127.0816731238502 },
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.jtbc.joins.com%2Fhtml%2F833%2FNB11580833.html&psig=AOvVaw1q_U7uOzf-cLsUjbCqrDjz&ust=1631877064432000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDsxvetg_MCFQAAAAAdAAAAABAT",
   },
];

function Home() {
   const classes = useStyles();
   const [loading, setLoading] = useState(true); // 로딩 상태 관리
   const [requestItem, setRequestItem] = useState(null); // 요청 리스트 중 하나를 선택할지 여기에 그 데이터가 들어감
   const [requestList, setRequestList] = useState([]); // 요청리스트
   const [wholeListItem, setWholeListItem] = useState(null); // 전체 리스트 중 하나를 선택할지 여기에 그 데이터가 들어감
   const [wholeList, setWholeList] = useState([]); // 전체 리스트
   const [refresh, setRefresh] = useState(0);

   // 가운데 paper 사이즈 적용
   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

   useEffect(() => {
      setLoading(true);
      // 요청리스트 받아오기
      const getList = async () => {
         // 요청리스트 받아오기
         setRequestList(locate);
         // 전체 리스트 받아오기
         setWholeList(locate);
         setLoading(false);
      };
      getList();
   }, [refresh]);

   return (
      <>
         <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
               <Paper className={fixedHeightPaper}>
                  <Route exact path={REQUEST}>
                     <PageList
                        setLoading={setLoading}
                        list={requestList}
                        setItem={setRequestItem}
                        setRefresh={setRefresh}
                     />
                  </Route>
                  <Route path={REQUEST_ITEM}>
                     <PageItem item={requestItem} />
                  </Route>
                  <Route exact path={WHOLELIST}>
                     <WholeList
                        setLoading={setLoading}
                        list={wholeList}
                        setItem={setWholeListItem}
                        setRefresh={setRefresh}
                     />
                  </Route>
                  <Route path={WHOLELIST_ITEM}>
                     <WholeListItem
                        item={wholeListItem}
                        setItem={setWholeListItem}
                        setLoading={setLoading}
                        setRefresh={setRefresh}
                     />
                  </Route>
               </Paper>
            </Container>
         </main>
         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </>
   );
}

export default Home;
