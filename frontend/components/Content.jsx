import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import RequestInput from "./RequestInput";
import RequestOptions from "./RequestOptions";
import RequestOptionsSector from "./RequestOptionsSector";
import TabBar from "./Tabs/TabBar";
import { useDispatch, useSelector } from "react-redux";
import * as tabActions from "../store/modules/tab";
import * as ctabActions from "../store/modules/ctab";
import * as apiActions from "../store/modules/api";
import * as resultActions from "../store/modules/apiresult";
import ReactJson from "react-json-view";

const Content = ({ current }) => {
  const { title, description, seq, url, userId, img } = current;
  const tabs = useSelector((state) => state.tab.tabs);
  const request = useSelector((state) => state.api.request);
  const token = useSelector((state) => state.user.token);
  const ctab = useSelector((state) => state.ctab);

  // console.log(result);

  const dispatch = useDispatch();
  const [requestTabs] = useState(["Params", "Authorization", "Headers", "Body", "Settings"]);
  const [requestTabIndex, setRequestTabIndex] = useState(0);
  const [selectItem, setSelectItem] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [selectTabSeq, setSelectTabSeq] = useState(0);
  const [parsingHeaders, setParsingHeaders] = useState({});
  const [parsingParams, setParsingPrams] = useState({});
  console.log("tabs", tabs);

  // console.log("ctab", ctab);
  // const [collectionList, setCollectionList] = useState([]);
  // const collections = useSelector((state) => state.collections.list);
  // const [showModal, setShowModal] = useState(false);

  const handleTabChange = async (index) => {
    dispatch(apiActions.resetParamDatas([]));
    await axios({
      method: "GET",
      url: "/api/tabs/" + tabs[index].seq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);

        if (res.data.response.tabDto.params === null) {
          dispatch(apiActions.resetParamDatas([]));
        } else {
          dispatch(apiActions.resetParamDatas(res.data.response.tabDto.params));
        }

        dispatch(ctabActions.setCtabs({}));
        dispatch(ctabActions.setCtabs(res.data.response.tabDto));
        dispatch(ctabActions.setAddress(current.url));
      })
      .catch((error) => {
        console.error(error);
      });
    setSelectTabSeq(tabs[index].seq);
    setCurrentTab(index);
    // dispatch(tabActions.setTabIndexState(index));
  };
  const handleRequestTabChange = (index) => {
    setRequestTabIndex(index);
  };
  const handleNewTab = async () => {
    if (tabs.length >= 5) {
      alert("Tabs already fulls... delete another tabs..");
      return;
    }
    await axios({
      method: "POST",
      url: "/api/tabs",
      data: {
        workspaceSeq: current.seq,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(tabActions.setTabs(res.data.response.tab));
      })
      .catch((error) => console.error(error));
  };

  const handleRemoveTab = async (selectTab) => {
    await axios({
      method: "DELETE",
      url: "/api/tabs/" + selectTab.seq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        window.location.reload();
        console.log(res.data);
      })

      .catch((error) => console.error(error));
  };

  const handleSubmit = () => {
    const paramsJson = request.params;
    if (paramsJson.constructor === Array) {
      paramsJson.forEach((array) => {
        const copied = parsingParams;
        copied[array.paramKey] = array.paramValue;
        setParsingPrams(copied);
      });
    }

    const headersJson = request.headers;
    if (headersJson.constructor === Array) {
      headersJson.forEach((array) => {
        const copied = parsingHeaders;
        copied[array.paramKey] = array.paramValue;
        setParsingHeaders(copied);
      });
    }
    const payload = {
      address: current.url,
      httpMethod: ctab.httpMethod,
      headers: {},
      params: parsingParams,
      path: request.uri,
      tabSeq: ctab.seq,
      workspaceSeq: current.seq,
    };
    console.log("payload", payload);

    axios({
      method: "POST",
      url: "/api/api-result",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.response);
        let a = JSON.parse(res.data.response.body);
        dispatch(resultActions.setResultState(a));
        console.log(a);
      })
      .catch((error) => {
        // console.log(payload);
        // console.error(error);
        console.log(error.response.data.error);
      });
  };

  const [btnDescription, setBtnDescription] = useState(false);

  const [newBtn, setNewBtn] = useState(false);
  const [newCollection, setNewCollection] = useState("");

  // const handleNewCollection = (e) => {
  //   setNewCollection(e.target.value);
  // };
  // const clickSaveCollections = () => {
  //   const paramsJson = request.params;
  //   // console.log(paramsJson.constructor)
  //   // console.log(Object.keys(paramsJson).length)
  //   // console.log(paramsJson)
  //   if (paramsJson.constructor === Array) {
  //     paramsJson.forEach((array) => {
  //       const copied = parsingParams;
  //       copied[array.paramKey] = array.paramValue;
  //       setParsingPrams(copied);
  //     });
  //   }

  //   const headersJson = request.headers;
  //   if (headersJson.constructor === Array) {
  //     headersJson.forEach((array) => {
  //       const copied = parsingHeaders;
  //       copied[array.paramKey] = array.paramValue;
  //       setParsingHeaders(copied);
  //     });
  //   }
  //   const payload = {
  //     address: current.url,
  //     collectionSeq: selectItem.seq,
  //     headers: parsingHeaders,
  //     httpMethod: request.payload.httpMethod,
  //     params: parsingParams,
  //     path: request.uri,
  //     seq: selectItem.tabSeq,
  //   };
  //   console.log("payload", payload);
  //   axios({
  //     method: "PATCH",
  //     url: "/api/tabs",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: payload,
  //   })
  //     .then((res) => {
  //       console.log("success", res.data.response);
  //       setShowModal(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setShowModal(false);
  //     });
  // };

  // const handleCollectionEnter = async (e) => {
  //   e.preventDefault();
  //   if (e.key === "Enter") {
  //     await axios({
  //       method: "POST",
  //       url: "/api/collections",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: {
  //         name: newCollection,
  //         workspaceSeq: seq,
  //       },
  //     })
  //       .then((res) => {
  //         getCollectionList();
  //         setNewCollection("");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  // const clickItem = (item) => {
  //   console.log(item);
  //   setSelectItem(item);
  // };

  return (
    <div className="flex">
      <div className="mx-auto mt-8">
        <div>
          <p className=" font-bold text-3xl">
            {title} ({url})
          </p>
        </div>
        <div>
          <p className="mt-2 text-gray-400 text-xs">{description}</p>
        </div>

        <TabBar
          tabs={tabs}
          tabIndex={currentTab}
          handleTabChange={handleTabChange}
          handleNewTab={handleNewTab}
          handleRemoveTab={handleRemoveTab}
        />
        <RequestInput tabs={selectTabSeq} handleSubmit={handleSubmit} url={url} />
        <RequestOptionsSector
          requestTabs={requestTabs}
          tabIndex={requestTabIndex}
          handleRequestTabChange={(index) => handleRequestTabChange(index)}
        />
        <RequestOptions requestTabIndex={requestTabIndex} />
      </div>
    </div>
  );
};

export default Content;
