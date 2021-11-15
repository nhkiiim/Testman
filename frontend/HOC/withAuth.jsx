import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCookie } from "../util/cookie";
import * as userActions from "../store/modules/user";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const uToken = useSelector((state) => state.user.token);

    const accessToken = getCookie("token");
    // console.log(accessToken);

    if (!accessToken) {
      router.replace("/NeedAuth");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
