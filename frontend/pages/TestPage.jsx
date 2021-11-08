import axios from "axios";
import router, { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Content from "../components/Content";
import Header2 from "../components/Header2";
import Sidebar from "../components/Sidebar";
import withAuth from "../HOC/withAuth";

const TestPage = () => {
  const current = useSelector((state) => state.current);

  return (
    <div>
      <Header2 />
      <Sidebar />
      <Content data={current} />
    </div>
  );
};

export default withAuth(TestPage);
