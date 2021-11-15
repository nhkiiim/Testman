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
import * as collectionAction from "../store/modules/collections";
import * as tabAction from "../store/modules/tab";

const TestPage = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current);
  const cc = useSelector((state) => state.collections);
  const allTab = useSelector((state) => state.tab);
  console.log(allTab);
  console.log(current);
  useEffect(() => {
    console.log(cc);
    dispatch(pageAction.setPageState(1));
    dispatch(processAction.setProcessData({}));
    getCollectionList();
    getAllTabs();
    console.log(allTab);
  }, []);
  const getAllTabs = async () => {
    await axios({
      method: "GET",
      url: "/api/tabs/list/" + current.seq,
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

  const getCollectionList = async () => {
    await axios({
      method: "GET",
      url: "/api/collections/" + current.seq,
    })
      .then((res) => {
        console.log(res.data.response.collectionList);
        // setCollectionList(res.data.response.collectionList);
        dispatch(collectionAction.setCollections(res.data.response.collectionList));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header2 />
      <Sidebar current={current} />
      <Content current={current} />
    </div>
  );
};

export default withAuth(TestPage);
