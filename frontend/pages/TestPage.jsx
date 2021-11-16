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
import ReactJson from "react-json-view";
import Result from "../components/Result";
import TestLoading from "../components/TestLoading";

const DynamicComponent = dynamic(import("../components/Result"), {
  loading: () => (
    <div>
      <TestLoading />
    </div>
  ),
  ssr: false,
});

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
  console.log(cseq);
  useEffect(() => {
    // console.log(cc);
    dispatch(pageAction.setPageState(1));
    dispatch(processAction.setProcessData({}));

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
        console.log(res.data.response.tabList);
        dispatch(tabAction.getAllTabs(res.data.response.tabList));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-full">
      <Header2 />
      {/* <Sidebar current={current} /> */}
      <Content current={current} />
      {result ? <DynamicComponent /> : <div>none</div>}
    </div>
  );
};

export default withAuth(TestPage);
