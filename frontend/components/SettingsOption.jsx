import React, { useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const SettingsOption = () => {
  const [sslBtn, setSslBtn] = useState(true)

  const clickSslBtn = () => {
    console.log(sslBtn)
    if (sslBtn) {
      return setSslBtn(false)
    } else {
      return setSslBtn(true)
    }
  }

  useEffect(() => {
    console.log(sslBtn)
  })
  
  return (
    <>
    <div className="flex">
      <div>
        Enable SSL certificate verification
      </div>
      <button onClick={clickSslBtn}>
        {sslBtn?
        <FaToggleOn className="h-6 text-purple-400"/>:
        <FaToggleOff className="h-6 text-purple-400"/>
        }
        
      </button>
    </div>
    </>
  );
};

export default SettingsOption;