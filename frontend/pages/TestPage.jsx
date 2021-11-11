import axios from "axios";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Content from "../components/Content";
import Header2 from "../components/Header2";
import Sidebar from "../components/Sidebar";

const TestPage = () => {
  const { no } = router.query;
  const token = useSelector((state) => state.user.token);
  // console.log(token);
  const [projectData, setProjectData] = useState({});
  const getLogin = async () => {
    await router.push("/Login");
  };
  useEffect(async () => {
    {
      token === ""
        ? getLogin()
        : await axios({
            method: "get",
            url: "/api/workspaces/" + no,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              console.log(res.data);
              setProjectData(res.data.response);
            })
            .catch((error) => {
              console.log(error);
            });
    }

    // setProjectData(response.data.response);
  }, []);
  return (
    <div>
      <Header2 />
      <Sidebar no={no}/>
      <Content data={projectData} no={no}/>
    </div>
  );
};

export default TestPage;
