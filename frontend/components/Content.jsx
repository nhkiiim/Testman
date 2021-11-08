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

  const request = useSelector((state) => state.api.request);
  
  const handleSubmit = () => {
    axios
    .post('api/api-result', data=request)
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
  return (
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
      />
      <RequestOptionsSector
        requestTabs={requestTabs}
        tabIndex={requestTabIndex}
        handleRequestTabChange={(index) => handleRequestTabChange(index)}
      />
      <RequestOptions requestTabIndex={requestTabIndex}/>
    </div>
  );
};

export default Content;
