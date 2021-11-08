import router from "next/router";
import React from "react";

const ProjectListsDt = ({ title, seq }) => {
  // console.log(title);
  const handlerPjtList = () => {
    console.log(seq);
    router.push({
      pathname: "/TestPage",
      query: {
        no: seq,
      },
    });
  };
  return (
    <div
      className="flex items-center mb-2 border-b pb-2 w-[100%] text-gray-500 hover:text-indigo-700  cursor-pointer"
      onClick={handlerPjtList}
    >
      <span className="ml-2  ">{title}</span>
    </div>
  );
};

export default ProjectListsDt;
