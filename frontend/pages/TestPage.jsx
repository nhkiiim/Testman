import axios from "axios";
import router, { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Content from "../components/Content";
import Header2 from "../components/Header2";
import Sidebar from "../components/Sidebar";
import withAuth from "../HOC/withAuth";
import * as pageAction from "../store/modules/page";
import * as processAction from "../store/modules/process";
import dynamic from "next/dynamic";
import * as tabAction from "../store/modules/tab";
import * as currentAction from "../store/modules/current";
import Result from "../components/Result";
import TestLoading from "../components/TestLoading";
import * as statActions from "../store/modules/teststat";
import WaitSend from "../components/WaitSend";

const TestPage = () => {
  const router = useRouter();
  const { no } = router.query;
  // console.log(no);
  const result = useSelector((state) => state.apiresult.result);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current);
  const cc = useSelector((state) => state.collections);
  const allTab = useSelector((state) => state.tab);
  const cseq = useSelector((state) => state.current.seq);
  const cstat = useSelector((state) => state.teststat.stat);
  // console.log(cstat);
  // console.log(cseq);
  // console.log(result);
  useEffect(() => {
    // console.log(cc);
    dispatch(pageAction.setPageState(1));
    dispatch(processAction.setProcessData({}));
    dispatch(statActions.setStat("api"));

    getAllTabs();
  }, [cseq]);
  const getAllTabs = async () => {
    await axios({
      method: "GET",
      url: "/api/tabs/list/" + cseq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data.response.tabList);
        dispatch(tabAction.getAllTabs(res.data.response.tabList));
      })
      .catch((error) => {
        alert.error("저장된 Tab 정보를 불러오는 것에 실패했습니다.");
      });
  };

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <Header2 />
      <div className="pb-24">
        {/* <Sidebar current={current} /> */}
        <Content current={current} />
        <div className={cstat !== "api" || result.length === 0 ? "hidden" : ""}>
          <Result />
        </div>
        <div className={result.length === 0 ? "" : "hidden"}>
          <WaitSend />
        </div>
      </div>
    </div>
  );
};

export default withAuth(TestPage);
