import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import workspaceDump from "../dummy/workspaceDump.json";
import MediumCard from "../components/MediumCard";
import Aos from "aos";
import "aos/dist/aos.css";
import Header2 from "../components/Header2";
const MyPage = () => {
  const [dataCnt, setDataCnt] = useState(4);

  useEffect(() => {
    workspaceDump.filter((data) => {
      {
        data.name == "" ? setDataCnt(dataCnt - 1) : null;
      }
    });
    Aos.init({ duration: 2000 });
  }, []);

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
            {workspaceDump?.map(({ no, name, url, description, img }) => (
              <MediumCard
                key={no}
                no={no}
                name={name}
                url={url}
                description={description}
                img={img}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyPage;
