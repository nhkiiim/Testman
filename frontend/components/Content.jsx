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
import { useAlert } from "react-alert";
import * as loadActions from "../store/modules/load";

const Content = ({ current }) => {
  const alert = useAlert();
  const { title, description, seq, url, userId, img } = current;
  const tabs = useSelector((state) => state.tab.tabs);
  const request = useSelector((state) => state.api.request);
  const token = useSelector((state) => state.user.token);
  const ctab = useSelector((state) => state.ctab.datas);
  const tstat = useSelector((state) => state.teststat.stat);
  const loaded = useSelector((state) => state.load);
  const sgd = useSelector((state) => state.load.summaryGraphData);
  const subPath = useSelector((state) => state.api.subPath);
  const mergePath = useSelector((state) => state.api.mergePath);
  // console.log(ctab);

  console.log(loaded);
  // console.log(tstat);
  console.log(tabs);

  const dispatch = useDispatch();
  const [requestTabs] = useState(["Params", "Headers", "Body", "Settings"]);
  const [requestTabIndex, setRequestTabIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectTabSeq, setSelectTabSeq] = useState(0);
  const [parsingHeaders, setParsingHeaders] = useState({});
  const [parsingParams, setParsingParams] = useState({});
  const [parsingBody, setParsingBody] = useState({});

  const handleTabChange = async (index) => {
    dispatch(resultActions.setResultState({}));
    dispatch(loadActions.setLoadResults([]));
    dispatch(apiActions.resetParamDatas([]));
    dispatch(apiActions.resetHeaderDatas([]));
    dispatch(apiActions.resetBodyDatas([]));
    dispatch(apiActions.resetAllDatas({}));

    await axios({
      method: "GET",
      url: "/api/tabs/" + tabs[index].seq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        // dispatch(resultActions.setResultState([]));
        if (res.data.response.tabDto.params === null) {
          dispatch(ctabActions.resetParamDatas([]));
        } else {
          dispatch(ctabActions.resetParamDatas(res.data.response.tabDto.params));
        }
        if (res.data.response.tabDto.headers === null) {
          dispatch(ctabActions.resetHeaderDatas([]));
        } else {
          dispatch(ctabActions.resetHeaderDatas(res.data.response.tabDto.headers));
        }
        if (res.data.response.tabDto.body === null) {
          dispatch(ctabActions.resetBodyDatas([]));
        } else {
          dispatch(ctabActions.resetBodyDatas(res.data.response.tabDto.body));
        }
        dispatch(ctabActions.setcTabSeq(res.data.response.tabDto.seq));
        dispatch(ctabActions.setAddress(current.url));
        dispatch(ctabActions.setcTabWorkspaceSeq(res.data.response.tabDto.workspaceSeq));
      })
      .catch((error) => {
        alert.error("Tab 데이터를 불러오는 것에 실패했습니다. 다시 시도해주세요.");
      });

    await axios({
      method: "get",
      url: "/api/load-result/list/" + tabs[index].seq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(loadActions.setLoadResults(res.data.response.loadResultList));
      })
      .catch((error) => {
        // console.error(error);
        // alert.error("문제가 발생했습니다.");
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
      alert.info("Tabs already fulls... delete another tabs..");
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
        // console.log(res.data);
        dispatch(tabActions.setTabs(res.data.response.tab));
      })
      .catch((error) => {
        alert.error("Tab 생성에 실패했습니다.");
      });
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
        // console.log(res.data);
      })

      .catch((error) => {
        if (error.response.status === 500) {
          alert.error("Tab 생성에 실패했습니다.");
        }
      });
  };

  const handleSubmit = async () => {
    const paramsJson = request.params;
    if (paramsJson) {
      const copied = "";
      paramsJson.forEach((array, idx) => {
        console.log(array, idx);
        if (array.saved) {
          if (idx === 0) {
            copied += "?";
          }
          if (idx > 0) {
            copied += "&";
          }
          copied += array.paramKey;
          copied += "=";
          copied += array.paramValue;
        }
      });
      const merged = request.path + copied;
      setParsingParams(copied);
      console.log(copied);
      dispatch(ctabActions.setCurl(copied));
      dispatch(apiActions.setSubPathState(copied));
      dispatch(apiActions.setMergePathState(merged));
    }

    const headersJson = request.headers;
    console.log("headers", request.headers);
    if (headersJson.constructor === Array) {
      headersJson.forEach((array) => {
        const copied = parsingHeaders;
        copied[array.headerKey] = array.headerValue;
        setParsingHeaders(copied);
      });
    }
    const bodyJson = request.body;
    if (bodyJson.constructor === Array) {
      bodyJson.forEach((array) => {
        const copied = parsingBody;
        copied[array.bodyKey] = array.bodyValue;
        setParsingBody(copied);
      });
    }

    if (tstat === "api") {
      const ctype = {
        "Content-Type": request.contentType,
      };
      const theaders = Object.assign(ctype, parsingHeaders);
      const payload = {
        address: current.url,
        httpMethod: request.httpMethod,
        // path: request.path + subPath,
        path: mergePath,
        body: parsingBody,
        tabSeq: ctab.seq,
        workspaceSeq: current.seq,
      };
      payload.headers = theaders;
      // console.log(request.contentType);

      if (request.contentType === null) {
        delete payload.headers["Content-Type"];
      }
      console.log("payload", payload);

      await axios({
        method: "POST",
        url: "/api/api-result",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      })
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data.response);
          // let a = JSON.parse(res.data);
          let b = JSON.parse(res.data.response.body);
          dispatch(resultActions.setResultState(b));
          // console.log(a);
        })
        .catch((error) => {
          console.error(error);

          alert.error("서버오류로 인해 데이터를 불러오는 데에 실패했습니다.");
        });
    } else {
      dispatch(loadActions.countLoop(request.loop));
      dispatch(loadActions.countThread(request.thread));
      const ctype = {
        "Content-Type": request.contentType,
      };
      const theaders = Object.assign(ctype, parsingHeaders);

      const payload = {
        address: current.url,
        httpMethod: request.httpMethod,
        path: request.path + subPath,
        body: parsingBody,
        tabSeq: ctab.seq,
        workspaceSeq: current.seq,
        loop: request.loop,
        thread: request.thread,
      };
      payload.headers = theaders;
      // console.log("payload", payload);
      if (request.contentType === null) {
        delete payload.headers["Content-Type"];
      }

      await axios({
        method: "POST",
        url: "/api/load-result",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      })
        .then((res) => {
          console.log(res.data.response.loadResult.resultSummary);
          // dispatch(loadActions.addLoadResults(res.data.response.loadResult));
          dispatch(loadActions.addLoadResults(res.data.response.loadResult));
          const tdata = {
            avgElapsedList: [
              {
                data: [
                  {
                    x: 0,
                    y: 0,
                  },
                ],
              },
            ],
            throughputList: [
              {
                data: [
                  {
                    x: 0,
                    y: 0,
                  },
                ],
              },
            ],
          };

          tdata.avgElapsedList[0].data = tdata.avgElapsedList[0].data.concat({
            x: tdata.avgElapsedList[0].data.length,
            y: Number(res.data.response.loadResult.resultSummary.avgElapsed),
          });
          tdata.throughputList[0].data = tdata.throughputList[0].data.concat({
            x: tdata.throughputList[0].data.length,
            y: Number(res.data.response.loadResult.resultSummary.throughput),
          });

          console.log(tdata);
          dispatch(loadActions.setSummaryGraphData(tdata));
        })
        .catch((error) => {
          alert.error("서버오류로 인해 데이터를 불러오는 데에 실패했습니다.");
        });
    }
  };
  return (
    <div className="flex">
      <div className="mx-auto mt-8">
        <div>
          <p className=" font-bold text-3xl">{title} </p>
        </div>
        <div className="mt-1">
          <p className=" text-gray-400 text-sm">{url}</p>
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
