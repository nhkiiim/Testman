import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCookie } from "../util/cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    const accessToken = getCookie("token");

    if (!accessToken) {
      router.replace("/NeedAuth");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
