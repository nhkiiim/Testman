import axios from "axios";
import React, { useState, useEffect } from "react";
import RequestInput from "./RequestInput";
import RequestOptions from "./RequestOptions";
import RequestOptionsSector from "./RequestOptionsSector";
import TabBar from "./Tabs/TabBar";
import { useDispatch, useSelector } from "react-redux";
import * as tabActions from "../store/modules/tab";

const Content = ({ data, no }) => {
  // const [tabs, setTabs] = useState([
  //   {
  //     index: Math.random(0, 10) * 10,
  //     name: "Test 01",
  //     type: "GET",
  //     URL: "http://testsman.com:8080/api/users/me",
  //     response: "test",
  //   },
  // ]);
  const tabs = useSelector((state) => state.tab.tabs)
  const [showModal, setShowModal] = useState(false);
  const [requestTabs] = useState(["Params", "Authorization", "Headers", "Body", "Settings"]);
  const tabIndex = useSelector((state) => state.tab.tabIndex)
  const [requestTabIndex, setRequestTabIndex] = useState(0);
  const [selectItem, setSelectItem] = useState('')
  const dispatch = useDispatch()
  const handleTabChange = (index) => {
    console.log('handletabchange', index)
    dispatch(tabActions.setTabIndexState(index));
  };
  const handleRequestTabChange = (index) => {
    setRequestTabIndex(index);
  };
  const handleNewTab = () => {
    if (tabs.length >= 5) {
      alert("Tabs already fulls... delete another tabs..");
      return;
    }
    const payload = {
      index: Math.random(0, 10) * 10,
      name: "Untitled Tab",
      type: "GET",
      URL: "",
      response: {},
    }
    dispatch(tabActions.setTabs(payload))
    dispatch(tabActions.setTabIndexState(tabs.length));
  };

  const handleRemoveTab = (selectTab) => {
    var tempTabs = tabs.filter((tab) => {
      tab.index !== selectTab.index;
    });
    // console.log(tempTabs)
    dispatch(tabActions.setTabs(tempTabs))
  };
  const [parsingParams, setParsingPrams] = useState({})
  const request = useSelector((state) => state.api.request);
  const token = useSelector((state) => state.user.token);
  const [parsingHeaders, setParsingHeaders] = useState({})
  const handleSubmit = () => {
    const paramsJson = request.params
    // console.log(paramsJson.constructor)
    // console.log(Object.keys(paramsJson).length)
    // console.log(paramsJson)
    if (paramsJson.constructor === Array){
      paramsJson.forEach(array => {
        const copied = parsingParams
        copied[array.paramKey] = array.paramValue
        setParsingPrams(copied)
      });
    }

    const headersJson = request.headers
    if (headersJson.constructor === Array){
      headersJson.forEach(array => {
        const copied = parsingHeaders
        copied[array.paramKey] = array.paramValue
        setParsingHeaders(copied)
      })
    }
    const payload = {
      "address": "http://www.testsman.com:8080",
      "httpMethod": request.payload.httpMethod,
      "headers": parsingHeaders,
      "params": parsingParams,
      "path": request.uri,
      "tabSeq": tabIndex,
      "workspaceSeq": 0
    }
    // const payload2 = {
    //   "workspaceSeq":4,
    //   "tabSeq":1,
    //   "address":"http://www.testsman.com:8080",
    //   "path": "/api/workspaces",
    //   "httpMethod": "GET",
    //   "params": {
    //       "seq": 1,
    //       "title": "new project",
    //       "url": "www.ssafy.com"
    //   }
  // }
    axios({
      method: "POST",
      url: "/api/api-result",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    })
      .then((res) => {
        console.log(res.data.response)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const handleURLChange = (e) => {
    const tempTabs = tabs;
    tempTabs[tabIndex].URL = e.target.value;
    dispatch(tabActions.setTabs(tempTabs));
  };

  const [collectionList, setCollectionList] = useState([])

  const getCollectionList = () => {
    axios({
      method: "GET",
      url: `/api/collections/${no}`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        console.log(res.data.response.collectionList)
        setCollectionList(res.data.response.collectionList)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const clickSaveBtn = () => {
    setShowModal(true)
    getCollectionList()
  }
  const [btnDescription, setBtnDescription] = useState(false);

  const [newBtn, setNewBtn] = useState(false)
  const [newCollection, setNewCollection] = useState('')

  const handleNewCollection = (e) => {
    setNewCollection(e.target.value)
  }
  const clickSaveCollections = () => {
    const paramsJson = request.params
    // console.log(paramsJson.constructor)
    // console.log(Object.keys(paramsJson).length)
    // console.log(paramsJson)
    if (paramsJson.constructor === Array){
      paramsJson.forEach(array => {
        const copied = parsingParams
        copied[array.paramKey] = array.paramValue
        setParsingPrams(copied)
      });
    }

    const headersJson = request.headers
    if (headersJson.constructor === Array){
      headersJson.forEach(array => {
        const copied = parsingHeaders
        copied[array.paramKey] = array.paramValue
        setParsingHeaders(copied)
      })
    }
    const payload = {
      "address": "http://www.testsman.com:8080",
      "collectionSeq": selectItem.seq,
      "headers": parsingHeaders,
      "httpMethod": request.payload.httpMethod,
      "params": parsingParams,
      "path": request.uri,
      "seq": 15,
    }
    console.log('payload', payload)
    axios({
      method: "PATCH",
      url: "/api/tabs",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    })
    .then((res) => {
      console.log('success', res.data.response)
      setShowModal(false)
    })
    .catch((error) => {
      console.log(error)
      setShowModal(false)
    })
  }

  const handleCollectionEnter = (e) => {
    if (e.key==="Enter") {
      axios({
        method:"POST",
        url: "/api/collections",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          "name":newCollection,
          "workspaceSeq": no
        }
      })
        .then((res) => {
          getCollectionList()
          setNewCollection('')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const clickItem = (item) => () => {
    console.log(item)
    setSelectItem(item)
  }


  useEffect(async () => {
    const initTab = {
      index: Math.random(0, 10) * 10,
      name: data.title,
      type: "GET",
      URL: data.url,
      response: {},
    }
    dispatch(tabActions.setTabs(initTab))
    dispatch(tabActions.setTabIndexState(tabs.length));
  }, []);
  return (
    <div>
      {showModal?
          <>
              (<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Save request</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form className="flex flex-col w-[350px]" method="POST" action="#">
      
                      <div className="mb-6 pt-3 rounded">
                        <label className="block text-sm font-bold mb-0 ml-3" for="URL">
                          Save to {selectItem.name}
                        </label>
                        {collectionList.map((item, i) => (
                          <div key={i} onClick={clickItem(item)}>
                            {item.name}
                          </div>
                        ))}
                        {!newBtn ?
                          <div>
                            <button className="bg-white w-full mb-0 ml-3 text-left hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50" onClick={() => {
                              setNewBtn(true)
                            }}>
                              New Collection
                            </button>
                          </div>
                          :
                          <div>
                            <input type="text" placeholder="Enter collection name" onKeyPress={handleCollectionEnter} onChange={handleNewCollection} value={newCollection}/>
                          </div>
                        }
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-purple-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={clickSaveCollections}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>)
            </>
          :
          null
          }
    <div className="ml-[312px]">
      <p className="mt-5 font-bold text-xl">
        {data.title} ({data.url})
      </p>
      <p className="mt-2 text-gray-400 text-xs">{data.description}</p>
      <TabBar
        tabs={tabs}
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
        handleNewTab={handleNewTab}
        handleRemoveTab={handleRemoveTab}
      />
      <RequestInput
        tabs={tabs[tabIndex]}
        handleURLChange={handleURLChange}
        handleSubmit={handleSubmit}
        url={data.url}
        clickSaveBtn={clickSaveBtn}
      />
      <RequestOptionsSector
        requestTabs={requestTabs}
        tabIndex={requestTabIndex}
        handleRequestTabChange={(index) => handleRequestTabChange(index)}
      />
      <RequestOptions requestTabIndex={requestTabIndex}/>
    </div>
    </div>
  );
};

export default Content;
