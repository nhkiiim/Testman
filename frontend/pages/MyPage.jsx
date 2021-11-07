import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import workspaceDump from "../dummy/workspaceDump.json";
import MediumCard from "../components/MediumCard";
import Aos from "aos";
import "aos/dist/aos.css";
import Header2 from "../components/Header2";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as projectActions from "../store/modules/project";

const MyPage = () => {
  const router = useRouter();
  const category = router.query;
  const [dataCnt, setDataCnt] = useState(4);
  const [workspaces, setWorkSpaces] = useState([]);
  const token = useSelector((state) => state.user.token);
  // console.log(token);
  const dispatch = useDispatch();
  useEffect(async () => {
    {
      token === "" ? router.push("/Login") : await getFetchData();
    }

    // workspaceDump.filter((data) => {
    //   {
    //     data.name == "" ? setDataCnt(dataCnt - 1) : null;
    //   }
    // });
    // Aos.init({ duration: 2000 });
  }, []);
  const getFetchData = async () => {
    await axios
      .get("/api/workspaces")
      .then((res) => {
        setWorkSpaces(res.data.response.workspaceDtoList);
        dispatch(projectActions.setProject(res.data.response.workspaceDtoList));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(workspaces);
  return (
    <div className="bg-gray-200 ">
      {/* <Header /> */}
      <Header2 />

      <main className="max-w-7xl mx-auto px-16 sm:px-32 bg-gray-200 ">
        <section className="mt-5">
          <h2 className="text-2xl font-semibold py-8 items-center md:mx-2 underline">
            Project List ({dataCnt} / 4)
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 ">
            {workspaces?.map(({ seq, title, url, description, img, createDate }) => (
              <MediumCard
                key={seq}
                title={title}
                url={url}
                description={description}
                img={img}
                createDate={createDate}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyPage;
