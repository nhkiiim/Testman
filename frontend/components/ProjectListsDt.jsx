import React from "react";

const ProjectListsDt = ({ title, seq }) => {
  console.log(title);
  return (
    <div className="flex items-center mb-2 border-b pb-2">
      <span className="ml-2 cursor-pointer hover:text-indigo-700">{title}</span>
    </div>
  );
};

export default ProjectListsDt;
