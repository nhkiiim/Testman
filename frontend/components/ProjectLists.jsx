import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as seqActions from "../store/modules/seq";
import * as currentActions from "../store/modules/current";
import axios from "axios";
import router from "next/router";

const ProjectLists = ({ name, select, seq }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const handlerPjtList = () => {
    // console.log(seq);
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
        // console.log(error);
      });
    router.push("/TestPage");
    dispatch(seqActions.setSeqState(seq));
  };
  useEffect(() => {
    // console.log(name);
  });

  return (
    <>
      <div onClick={handlerPjtList}>
        <p className="text-sm text-gray-800 py-2 px-10 hover:text-indigo-500 cursor-pointer">
          {name}
        </p>
      </div>
    </>
  );
};

export default ProjectLists;
