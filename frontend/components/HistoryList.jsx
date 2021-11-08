import React, { useEffect, useState } from "react";
import NoneData from "../components/NoneData";
import axios from "axios";

const HistoryList = ({ index, method, url, historyDataNone}) => {
  const getColor = {
    GET: "text-green-600 mr-[24px] text-sm",
    POST: "text-purple-600 mr-[14px] text-sm",
    PATCH: "text-yellow-600 mr-[6px] text-sm",
    PUT: "text-blue-600 mr-[23px] text-sm",
    DELETE: "text-red-600 text-sm",
  };
  const clickHistory = async() => {
    await axios({
      method: "get",
      url: `/api/histories/${index}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.response)
      })
      .catch((error) => {
        console.log(error)
      })

  }
  return (
    <>
    {historyDataNone ? (
      <NoneData/>
    ):(
      <div className="pt-2 h-10 w-full border-t">
      <div className="text-1xl ml-3" onclick={clickHistory}>
        <span className={getColor[method]}>{method}</span>
        <span className="px-[10px] text-gray-600">{url}</span>
      </div>
    </div>
    )
  }
  </>
  );
};

export default HistoryList;
