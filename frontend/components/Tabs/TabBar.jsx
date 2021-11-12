import React from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
const TabBar = (props) => {
  const { tabs, tabIndex, handleTabChange, handleNewTab, handleRemoveTab } = props;

  return (
    <div>
      <div className=" bg-white border-b-[1px] border-gray-200 h-[55px] mt-1">
        <div className="grid grid-cols-1 h-[55px]">
          <div className="self-end">
            <div className="w-[100%]">
              {tabs.map((tab, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleTabChange(index);
                    }}
                    className={
                      index === tabIndex
                        ? "ml-[3px] mb-[1px] w-[250px] text-xs h-8 text-gray-500 pt-2 rounded-tl-sm rounded-tr-sm cursor-pointer bg-white border-t-2 border-indigo-500 inline-block shadow-sm"
                        : "bg-gray-50 ml-[3px] mb-[1px] w-[250px] text-xs h-8 border-[1px] border-gray-300 text-gray-500 pt-2 rounded-tl-sm rounded-tr-sm cursor-pointer inline-block shadow-sm"
                    }
                  >
                    <span className="text-xs ml-2 mr-2 text-yellow-500 font-bold mt-2">
                      {tab.type}
                    </span>
                    {tab.name}
                    <div
                      className="float-right mr-[10px]  cursor-pointer"
                      onClick={() => handleRemoveTab(tab)}
                    >
                      <FaTimes />
                    </div>
                  </div>
                );
              })}
              <div
                className="bg-gray-50 ml-[3px] mb-[-11px] w-[30px] text-xs  h-8 border-[1px] border-gray-300 text-gray-500 pt-2 pl-[7px] rounded-tl-sm rounded-tr-sm cursor-pointer inline-block shadow-sm"
                onClick={handleNewTab}
              >
                <FaPlus />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
