import React, { useState, useEffect } from "react";
import AuthKey from "./AuthKey";
import BodyOption from "./BodyOption";
import SettingsOption from "./SettingsOption";
import Params from "./Params";
import Headers from "./Headers";

const RequestOptions = (props) => {
  const { requestTabIndex } = props;

  const render = () => {
    switch (requestTabIndex) {
      case 0:
        return (
          <div>
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
