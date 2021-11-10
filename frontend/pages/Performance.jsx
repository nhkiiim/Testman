import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header2 from "../components/Header2";
import withAuth from "../HOC/withAuth";
import * as pageAction from "../store/modules/page";

const Performance = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pageAction.setPageState(2));
  });

  return (
    <div>
      <Header2 />
    </div>
  );
};

export default withAuth(Performance);
