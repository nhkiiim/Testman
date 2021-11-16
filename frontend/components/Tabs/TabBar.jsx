import React from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import tab from "../../store/modules/tab";
const TabBar = (props) => {
  const { tabs, tabIndex, handleTabChange, handleNewTab, handleRemoveTab } = props;
  // console.log(tabs.length);

  return (
    <div>
      <div className=" bg-white  border-gray-200 h-[55px] mt-1">
        <div className="grid grid-cols-1 h-[55px]">
          <div className="self-end">
            <div className="w-[100%]">
              {tabs.length > 0 &&
                tabs.map((tab, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        handleTabChange(index);
                      }}
                      className={
                        index === tabIndex
                          ? "ml-[1px] mb-[1px] w-[238px] text-xs h-8 text-gray-500 pt-2 rounded-tl-sm rounded-tr-sm cursor-pointer bg-white border-t-2 border-indigo-500 inline-block shadow-sm"
                          : "bg-gray-50 ml-[1px] mb-[1px] w-[238px] text-xs h-8 border-[1px] border-gray-300 text-gray-500 pt-2 rounded-tl-sm rounded-tr-sm cursor-pointer inline-block shadow-sm"
                      }
                    >
                      <span className="text-xs ml-2 mr-2 text-yellow-500 font-bold mt-2">
                        {tab.httpMethod ? tab.httpMethod : "NULL"}
                      </span>
                      <span>{tab.path ? tab.path : "UNTITLED"}</span>

                      <div
                        className={
                          tabs.length === 1 ? "hidden" : "float-right mr-[10px]  cursor-pointer"
                        }
                        onClick={() => handleRemoveTab(tab)}
                      >
                        <FaTimes />
                      </div>
                    </div>
                  );
                })}
              <div
                className={
                  tabs.length === 0
                    ? "bg-gray-50  mb-[-3px] w-[30px] text-xs  h-8 border-[1px] border-gray-300 text-gray-500 pt-2 pl-[8px] rounded-tl-sm rounded-tr-sm cursor-pointer inline-block shadow-sm"
                    : tabs.length >= 5
                    ? "hidden"
                    : "bg-gray-50 ml-[1px] mb-[-9px] w-[30px] text-xs  h-8 border-[1px] border-gray-300 text-gray-500 pt-2 pl-[8px] rounded-tl-sm rounded-tr-sm cursor-pointer inline-block shadow-sm"
                }
                onClick={handleNewTab}
              >
                <FaPlus />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-[-2px]" />
    </div>
  );
};

export default TabBar;
