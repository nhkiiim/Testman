import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/solid";
import AuthKey from "./AuthKey";
import HeadersOption from "./HeadersOption";
import BodyOption from "./BodyOption";
import SettingsOption from "./SettingsOption";
import { setParamsState, setPayloadState } from "../store/modules/api";
import ParamsOption from "./ParamsOption";
import Params from "./Params";
import Headers from "./Headers";

const RequestOptions = (props) => {
  const { requestTabIndex } = props;

  const render = () => {
    switch (requestTabIndex) {
      case 0:
        return (
          <div>
            {/* <ParamsOption /> */}
            <Params />
          </div>
        );
      case 1:
        return (
          <div>
            <AuthKey />
          </div>
        );
      case 2:
        return (
          <div>
            {/* <HeadersOption /> */}
            <Headers />
          </div>
        );
      case 3:
        return (
          <div>
            <BodyOption />
          </div>
        );
      case 4:
        return <SettingsOption />;
    }
  };
  return <div>{render()}</div>;
};

export default RequestOptions;
