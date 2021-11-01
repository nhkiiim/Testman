import React, { useEffect } from "react";

const ProjectLists = ({ name, select }) => {
  useEffect(() => {
    console.log(name);
  });

  return (
    <>
      <p className="text-sm text-gray-800 py-2 px-10 hover:text-indigo-500 cursor-pointer">
        {name}
      </p>
    </>
  );
};

export default ProjectLists;
