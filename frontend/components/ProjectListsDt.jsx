import axios from "axios";
import router from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as seqActions from "../store/modules/seq";
import * as currentActions from "../store/modules/current";

const ProjectListsDt = ({ title, seq }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  // console.log(title);
  const handlerPjtList = () => {
    console.log(seq);
    axios({
      method: "get",
      url: "/api/workspaces/" + seq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(currentActions.setCurrentProject(res.data.response));
      })
      .catch((error) => {
        console.log(error);
      });
    router.push({
      pathname: "/TestPage",
    });
    dispatch(seqActions.setSeqState(seq));
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
