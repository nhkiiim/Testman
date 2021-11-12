import React from "react";

const RequestOptionsSector = (props) => {
  const { requestTabs, tabIndex, handleRequestTabChange } = props;

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="">
          <div className="inline-block mt-[10px] text-xs text-gray-500">
            {requestTabs.map((tab, index) => {
              return (
                <span
                  className={
                    index === tabIndex
                      ? "pl-[15px] pr-[15px] pb-[8px] ml-[8px] mr-[8px] cursor-pointer border-b-2 border-indigo-500"
                      : "pl-[15px] pr-[15px] pb-[8px] ml-[8px] mr-[8px] cursor-pointer"
                  }
                  onClick={() => handleRequestTabChange(index)}
                >
                  {tab}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestOptionsSector;
