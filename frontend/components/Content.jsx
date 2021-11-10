import axios from "axios";
import React, { useState } from "react";
import RequestInput from "./RequestInput";
import RequestOptions from "./RequestOptions";
import RequestOptionsSector from "./RequestOptionsSector";
import TabBar from "./Tabs/TabBar";
import { useSelector } from "react-redux";

const Content = ({ data}) => {
  const [tabs, setTabs] = useState([
    {
      index: Math.random(0, 10) * 10,
      name: "Test 01",
      type: "GET",
      URL: "http://testsman.com:8080/api/users/me",
      response: "test",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [requestTabs] = useState(["Params", "Authorization", "Headers", "Body", "Settings"]);
  const [tabIndex, setTabIndex] = useState(0);
  const [requestTabIndex, setRequestTabIndex] = useState(0);
  const handleTabChange = (index) => {
    setTabIndex(index);
  };
  const handleRequestTabChange = (index) => {
    setRequestTabIndex(index);
  };
  const handleNewTab = () => {
    if (tabs.length >= 5) {
      alert("Tabs already fulls... delete another tabs..");
      return;
    }
    setTabs([
      ...tabs,
      {
        index: Math.random(0, 10) * 10,
        name: "Untitled Tab",
        type: "GET",
        URL: "",
        response: {},
      },
    ]);
    setTabIndex(tabs.length);
  };

  const handleRemoveTab = (selectTab) => {
    var tempTabs = tabs.filter((tab) => {
      return tab.index !== selectTab.index;
    });
    setTabs(tempTabs);
  };
  const [parsingParams, setParsingPrams] = useState({})
  const request = useSelector((state) => state.api.request);
  const token = useSelector((state) => state.user.token);
  const [parsingHeaders, setParsingHeaders] = useState({})
  const handleSubmit = () => {
    const paramsJson = request.params
    console.log(paramsJson.constructor)
    console.log(Object.keys(paramsJson).length)
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
    //   "params": {
    //     "seq": 1,
    //     "title": "new project",
    //     "url": "www.ssafy.com"
    // },
      "path": request.uri,
      "tabSeq": 0,
      "workspaceSeq": 0
    }
    console.log(payload)
    axios({
      method: "post",
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
    setTabs(tempTabs);
  };

  const clickSaveBtn = () => {
    setShowModal(true)
  }
  const [btnDescription, setBtnDescription] = useState(false);

  const clickSaveCollections = () => { 
    axios
    .post('api/collecitons', data)
  }

  // useEffect(() => {
  //     console.log(selector)
  //   });
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
                        <label className="block text-sm font-bold mb-0 ml-3" for="requestName">
                          Request Name
                        </label>
                        <input
                          type="text"
                          id="requestName"
                          className="bg-gray-200 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                        />
                      </div>
                      {!btnDescription ?
                      <div>
                      <button className="block text-gray-700 text-sm font-bold mb-3 ml-3 text-left underline" onClick={() => {
                        setBtnDescription(true)
                      }}>Add description</button>
                      </div>
                      :
                      <div className="mb-6 pt-3 rounded">
                        <label className="block text-sm font-bold mb-0 ml-3" for="description">
                          Description
                        </label>
                        <textarea
                          type="text"
                          id="description"
                          className=" resize-none overflow-auto bg-gray-200 rounded w-full h-40 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                        />
                      </div>
                        
                    }
      
                      <div className="mb-6 pt-3 rounded">
                        <label className="block text-sm font-bold mb-0 ml-3" for="URL">
                          Save to
                        </label>
                        <button className="bg-white w-full mb-0 ml-3 text-left hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50">
                          New Collection
                        </button>
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
                      onClick={() => setShowModal(false)}
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
