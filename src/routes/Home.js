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
import WholeList from "../components/wholeList/WholeList";
import WholeListItem from "../components/wholeList/WholeListItem,";
import {
   REQUEST,
   REQUEST_ITEM,
   WHOLELIST,
   WHOLELIST_ITEM,
} from "../constants/Link";
import { getRequestListApi } from "../api/requestList";
import { NO_DATA } from "../api/serverError.js";
import { getWholeListApi } from "../api/wholeList";

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

function Home() {
   const classes = useStyles();
   const [loading, setLoading] = useState(true); // 로딩 상태 관리
   const [requestItem, setRequestItem] = useState(null); // 요청 리스트 중 하나를 선택할지 여기에 그 데이터가 들어감
   const [requestList, setRequestList] = useState([]); // 요청리스트
   const [wholeListItem, setWholeListItem] = useState(null); // 전체 리스트 중 하나를 선택할지 여기에 그 데이터가 들어감
   const [wholeList, setWholeList] = useState([]); // 전체 리스트
   const [isMutation, setIsMutation] = useState(false); // 전체 리스트 등록/수정 모드인지 표시
   const [refresh, setRefresh] = useState(0);

   // 가운데 paper 사이즈 적용
   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

   useEffect(() => {
      setLoading(true);
      const preprocessing = (data) => {
         const processed = data.map((item) => ({
            id: item.id,
            type: item.type,
            coords: {
               latitude: parseFloat(item.latitude),
               longitude: parseFloat(item.longitude),
            },
            image: item.imageUrl,
         }));
         return processed;
      };

      // 리스트 받아오기
      const getList = async () => {
         // 요청리스트 받아오기
         const res = await getRequestListApi();
         if (res.response === NO_DATA) {
            setRequestList([]);
         } else {
            setRequestList(preprocessing(res.response));
         }

         // 전체 리스트 받아오기
         const res_whole = await getWholeListApi();
         if (res_whole.response === NO_DATA) {
            setWholeList([]);
         } else {
            setWholeList(preprocessing(res_whole.response));
         }
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
                        setIsMutation={setIsMutation}
                     />
                  </Route>
                  <Route path={WHOLELIST_ITEM}>
                     <WholeListItem
                        item={wholeListItem}
                        setItem={setWholeListItem}
                        setLoading={setLoading}
                        setRefresh={setRefresh}
                        isMutation={isMutation}
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
