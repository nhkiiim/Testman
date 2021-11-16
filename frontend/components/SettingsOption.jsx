import React, { useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const SettingsOption = () => {
  const [sslBtn, setSslBtn] = useState(true);

  const clickSslBtn = () => {
    // console.log(sslBtn);
    if (sslBtn) {
      return setSslBtn(false);
    } else {
      return setSslBtn(true);
    }
  };

  useEffect(() => {
    // console.log(sslBtn);
  });

  return (
    <>
      <div className="flex mt-5 ml-5">
        <div>
          <p className="text-sm text-gray-600 font-medium">Enable SSL certificate verification</p>
        </div>
        <button onClick={clickSslBtn} className="ml-[25px] mt-[-2px]">
          {sslBtn ? (
            <FaToggleOn className="h-7 w-6 text-indigo-400" />
          ) : (
            <FaToggleOff className="h-7 w-6 text-indigo-400" />
          )}
        </button>
      </div>
      <div className="flex mt-1 ml-5">
        <p className="text-xs text-gray-500">
          Verify SSL certificates when sending a request. Verification failures will result in the
          request being aborted.
        </p>
      </div>
    </>
  );
};

export default SettingsOption;
