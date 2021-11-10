import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryList = (props) => {
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
      url: `/api/histories/${props.key}`,
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
    {props.historyData==false? (
      <div>
        no history
      </div>
    ):(
      <div className="pt-2 h-10 w-full border-t">
      <div className="text-1xl ml-3" onclick={clickHistory}>
        <span className={getColor[props.method]}>{props.method}</span>
        <span className="px-[10px] text-gray-600">{props.url}</span>
      </div>
    </div>
    )
  }
  </>
  );
};

export default HistoryList;
