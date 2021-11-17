import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as tabActions from "../store/modules/tab";

const CollectionsList = ({ data, current }) => {
  const { name, seq } = data;
  // console.log(seq);
  const getColor = {
    GET: "text-green-600 mr-[24px] text-sm",
    POST: "text-purple-600 mr-[14px] text-sm",
    PATCH: "text-yellow-600 mr-[6px] text-sm",
    PUT: "text-blue-600 mr-[23px] text-sm",
    DELETE: "text-red-600 text-sm",
  };
  // const collectionList = props.collectionList;
  // console.log(collectionList);
  const token = useSelector((state) => state.user.token);
  const tabs = useSelector((state) => state.tab.tabs);
  const dispatch = useDispatch();
  const tabIndex = useSelector((state) => state.tab.tabIndex);
  const openCollectionTab = async (tabInfo) => {
    if (tabs.length >= 5) {
      alert("Tabs already fulls... delete another tabs..");
      return;
    }
    await axios({
      method: "post",
      url: "/api/tabs",
      data: {
        workspaceSeq: current.seq,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      dispatch(tabActions.pushTabs(tabInfo)).catch((error) => console.error(error));
    });
    // dispatch(tabActions.setTabIndexState(tabs.length));
  };
  const clickCollections = (seq) => async () => {
    await axios({
      method: "GET",
      url: "/api/tabs/collection/" + seq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.response.tabList.length > 0) {
          openCollectionTab(res.data.response.tabList);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <>
      {!data ? (
        <div>no collections</div>
      ) : (
        <div className="pt-2 h-10 w-full border-t">
          <div className="text-1xl ml-3">
            <div className="hover:bg-gray-200 w-[100%] text-left" onClick={clickCollections(seq)}>
              <p>{name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionsList;
