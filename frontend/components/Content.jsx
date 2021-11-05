import axios from "axios";
import React, { useState } from "react";
import RequestInput from "./RequestInput";
import RequestOptions from "./RequestOptions";
import RequestOptionsSector from "./RequestOptionsSector";
import TabBar from "./Tabs/TabBar";

const Content = () => {
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

  const handleSubmit = () => {
    //   axios 통신
  };

  const handleURLChange = (e) => {
    const tempTabs = tabs;
    tempTabs[tabIndex].URL = e.target.value;
    setTabs(tempTabs);
  };
  return (
    <div className="ml-[312px]">
      <p className="mt-5 font-bold text-xl">TESTSMAN PROJECT</p>
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
      />
      <RequestOptionsSector
        requestTabs={requestTabs}
        tabIndex={requestTabIndex}
        handleRequestTabChange={(index) => handleRequestTabChange(index)}
      />
      <RequestOptions requestTabIndex={requestTabIndex} />
    </div>
  );
};

export default Content;
