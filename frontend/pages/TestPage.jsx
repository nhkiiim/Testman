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

const TestPage = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current);
  console.log(current);
  useEffect(() => {
    dispatch(pageAction.setPageState(1));
    dispatch(processAction.setProcessData({}));
  });

  return (
    <div>
      <Header2 />
      <Sidebar />
      <Content current={current} />
    </div>
  );
};

export default withAuth(TestPage);
