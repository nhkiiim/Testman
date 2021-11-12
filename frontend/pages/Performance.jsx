import axios from "axios";
import { easeQuadInOut } from "d3-ease";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ExclamationIcon } from "@heroicons/react/solid";
import { DuplicateIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { InformationCircleIcon } from "@heroicons/react/outline";
import Header2 from "../components/Header2";
import AnimatedProgressProvider from "../components/Modals/AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import UnSended from "../components/UnSended";
import withAuth from "../HOC/withAuth";
import * as processAction from "../store/modules/process";
import Footer from "../components/Footer";
import { useAlert } from "react-alert";

const Performance = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sended, setSended] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [data, setData] = useState({});
  const API_KEY = "AIzaSyAfEVp4lXSXlYgYlex9pLFRnmoLP7TqAyU";
  const API_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  const pData = useSelector((state) => state.process.processData);
  const [style, setStyle] = useState("");
  const [realDataSec, setRealDataSec] = useState({});
  const [realData, setRealData] = useState({});
  const [totalRate, setTotalRate] = useState(90);
  const [firstStat, setFirstStat] = useState("");
  const [speed, setSpeed] = useState("");
  const [largest, setLargest] = useState("");
  const [inter, setInter] = useState("");
  const [block, setBlock] = useState("");
  const [layout, setLayout] = useState("");
  const [onLoading, setOnLoading] = useState(false);
  const [settingUrl, setSettingUrl] = useState("");
  const alert = useAlert();
  const circleStyle = {
    good: {
      pathTransition: "none",
      pathColor: "#98FB98",
      textColor: "#98FB98",
    },
  };

  useEffect(() => {
    console.log(pData);

    console.log(realData);
    console.log(realDataSec);
    console.log(data);

    setStyle("good");
  }, [data, realData, firstStat, speed, largest, inter, block, layout]);

  const setUpQuery = () => {
    let query = `${API_URL}?`;
    query += `url=${pageUrl}&key=${API_KEY}`;
    console.log(query);

    return query;
  };

  const run = useCallback(async (e) => {
    e.preventDefault();
    setSended(false);
    setSettingUrl(pageUrl);
    setOnLoading(true);
    const url = setUpQuery();
    await fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        const parseData = res.lighthouseResult.audits.metrics.details.items[0];
        setData(res.lighthouseResult.audits.metrics.details.items[0]);
        console.log(data);
        dispatch(processAction.setProcessData(parseData));
        console.log("done");
        getRate(parseData);
        setSended(true);
        setOnLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert.show("error");
      });
  });
  const getRate = (props) => {
    setRealDataSec({
      firstPaint: (props.observedFirstContentfulPaint * 0.001).toFixed(1),
      speedIndex: (props.speedIndex * 0.001).toFixed(1),
      largestPaint: (props.observedLargestContentfulPaint * 0.001).toFixed(1),
      interactive: (props.interactive * 0.001).toFixed(1),
      blockingTime: (props.totalBlockingTime * 0.001).toFixed(1),
      layoutShift: (props.observedCumulativeLayoutShift * 0.001).toFixed(1),
    });
    setRealData({
      firstPaint: props.observedFirstContentfulPaint,
      speedIndex: props.speedIndex,
      largestPaint: props.observedLargestContentfulPaint,
      interactive: props.interactive,
      blockingTime: props.totalBlockingTime,
      layoutShift: props.observedCumulativeLayoutShift,
    });

    const a = 0;
    console.log(a);
    console.log(props.observedFirstContentfulPaint);
    if (props.observedFirstContentfulPaint <= 740) {
      a = 10;
      console.log(a);
    } else if (
      740 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 1000
    ) {
      a = 9;
      console.log(a);
    } else if (
      1100 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 1180
    ) {
      a = 8;
      console.log(a);
    } else if (
      1180 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 1330
    ) {
      a = 7;
      console.log(a);
    } else if (
      1330 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 1490
    ) {
      a = 6;
      console.log(a);
    } else if (
      1490 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 1660
    ) {
      a = 5;
      console.log(a);
    } else if (
      1660 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 1840
    ) {
      a = 4;
      console.log(a);
    } else if (
      1840 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 2080
    ) {
      a = 3;
      console.log(a);
    } else if (
      2080 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 2400
    ) {
      a = 2;
      console.log(a);
    } else if (
      2400 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 3040
    ) {
      a = 1;
      console.log(a);
    } else if (3040 < props.observedFirstContentfulPaint) {
      a = 0;
    }

    const b = 0;
    if (props.speedIndex <= 740) {
      b = 10;
    } else if (740 < props.speedIndex && props.speedIndex <= 1320) {
      b = 9;
    } else if (1320 < props.speedIndex && props.speedIndex <= 1600) {
      b = 8;
    } else if (1600 < props.speedIndex && props.speedIndex <= 1830) {
      b = 7;
    } else if (1830 < props.speedIndex && props.speedIndex <= 2060) {
      b = 6;
    } else if (2060 < props.speedIndex && props.speedIndex <= 2310) {
      b = 5;
    } else if (2310 < props.speedIndex && props.speedIndex <= 2580) {
      b = 4;
    } else if (2580 < props.speedIndex && props.speedIndex <= 2910) {
      b = 3;
    } else if (2910 < props.speedIndex && props.speedIndex <= 3350) {
      b = 2;
    } else if (3350 < props.speedIndex && props.speedIndex <= 4080) {
      b = 1;
    } else if (4080 < props.speedIndex) {
      b = 0;
    }

    const c = 0;
    if (props.observedLargestContentfulPaint <= 590) {
      c = 24;
    } else if (
      590 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 950
    ) {
      c = 23;
    } else if (
      950 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 1140
    ) {
      c = 22;
    } else if (
      1140 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 1280
    ) {
      c = 21;
    } else if (
      1280 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 1410
    ) {
      c = 20;
    } else if (
      1410 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 1530
    ) {
      c = 19;
    } else if (
      1530 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 1650
    ) {
      c = 18;
    } else if (
      1650 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 1760
    ) {
      c = 17;
    } else if (
      1760 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 1870
    ) {
      c = 16;
    } else if (
      1870 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 1990
    ) {
      c = 15;
    } else if (
      1990 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 2100
    ) {
      c = 14;
    } else if (
      2100 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 2220
    ) {
      c = 13;
    } else if (
      2220 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 2350
    ) {
      c = 12;
    } else if (
      2350 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 2480
    ) {
      c = 11;
    } else if (
      2480 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 2620
    ) {
      c = 10;
    } else if (
      2620 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 2770
    ) {
      c = 9;
    } else if (
      2770 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 2930
    ) {
      c = 8;
    } else if (
      2930 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 3110
    ) {
      c = 7;
    } else if (
      3110 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 3310
    ) {
      c = 6;
    } else if (
      3310 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 3540
    ) {
      c = 5;
    } else if (
      3540 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 3820
    ) {
      c = 4;
    } else if (
      3820 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 4150
    ) {
      c = 3;
    } else if (
      4150 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 4590
    ) {
      c = 2;
    } else if (
      4590 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 5220
    ) {
      c = 1;
    } else if (5220 < props.observedLargestContentfulPaint) {
      c = 0;
    }

    const d = 0;
    if (props.interactive <= 1340) {
      d = 10;
    } else if (1340 < props.interactive && props.interactive <= 2500) {
      d = 9;
    } else if (2500 < props.interactive && props.interactive <= 3050) {
      d = 8;
    } else if (3050 < props.interactive && props.interactive <= 3540) {
      d = 7;
    } else if (3540 < props.interactive && props.interactive <= 4020) {
      d = 6;
    } else if (4020 < props.interactive && props.interactive <= 4520) {
      d = 5;
    } else if (4520 < props.interactive && props.interactive <= 5100) {
      d = 4;
    } else if (5100 < props.interactive && props.interactive <= 5800) {
      d = 3;
    } else if (5800 < props.interactive && props.interactive <= 6740) {
      d = 2;
    } else if (6740 < props.interactive && props.interactive <= 8310) {
      d = 1;
    } else if (8310 < props.interactive) {
      d = 0;
    }
    const e = 0;
    if (props.totalBlockingTime <= 80) {
      e = 30;
    } else if (80 < props.totalBlockingTime && props.totalBlockingTime <= 110) {
      e = 29;
    } else if (110 < props.totalBlockingTime && props.totalBlockingTime <= 140) {
      e = 28;
    } else if (140 < props.totalBlockingTime && props.totalBlockingTime <= 160) {
      e = 27;
    } else if (160 < props.totalBlockingTime && props.totalBlockingTime <= 170) {
      e = 26;
    } else if (170 < props.totalBlockingTime && props.totalBlockingTime <= 180) {
      e = 25;
    } else if (180 < props.totalBlockingTime && props.totalBlockingTime <= 200) {
      e = 24;
    } else if (200 < props.totalBlockingTime && props.totalBlockingTime <= 220) {
      e = 23;
    } else if (220 < props.totalBlockingTime && props.totalBlockingTime <= 240) {
      e = 22;
    } else if (240 < props.totalBlockingTime && props.totalBlockingTime <= 250) {
      e = 21;
    } else if (250 < props.totalBlockingTime && props.totalBlockingTime <= 260) {
      e = 20;
    } else if (260 < props.totalBlockingTime && props.totalBlockingTime <= 280) {
      e = 19;
    } else if (280 < props.totalBlockingTime && props.totalBlockingTime <= 300) {
      e = 18;
    } else if (300 < props.totalBlockingTime && props.totalBlockingTime <= 320) {
      e = 17;
    } else if (320 < props.totalBlockingTime && props.totalBlockingTime <= 340) {
      e = 16;
    } else if (340 < props.totalBlockingTime && props.totalBlockingTime <= 350) {
      e = 15;
    } else if (350 < props.totalBlockingTime && props.totalBlockingTime <= 380) {
      e = 14;
    } else if (380 < props.totalBlockingTime && props.totalBlockingTime <= 400) {
      e = 13;
    } else if (400 < props.totalBlockingTime && props.totalBlockingTime <= 430) {
      e = 12;
    } else if (430 < props.totalBlockingTime && props.totalBlockingTime <= 440) {
      e = 11;
    } else if (440 < props.totalBlockingTime && props.totalBlockingTime <= 480) {
      e = 10;
    } else if (480 < props.totalBlockingTime && props.totalBlockingTime <= 500) {
      e = 9;
    } else if (500 < props.totalBlockingTime && props.totalBlockingTime <= 540) {
      e = 8;
    } else if (540 < props.totalBlockingTime && props.totalBlockingTime <= 580) {
      e = 7;
    } else if (580 < props.totalBlockingTime && props.totalBlockingTime <= 630) {
      e = 6;
    } else if (630 < props.totalBlockingTime && props.totalBlockingTime <= 680) {
      e = 5;
    } else if (680 < props.totalBlockingTime && props.totalBlockingTime <= 770) {
      e = 4;
    } else if (770 < props.totalBlockingTime && props.totalBlockingTime <= 860) {
      e = 3;
    } else if (860 < props.totalBlockingTime && props.totalBlockingTime <= 1000) {
      e = 2;
    } else if (1000 < props.totalBlockingTime && props.totalBlockingTime <= 1460) {
      e = 1;
    } else if (1460 < props.totalBlockingTime) {
      e = 0;
    }
    const f = 0;
    if (props.observedCumulativeLayoutShift <= 0.08) {
      f = 14;
    } else if (
      0.08 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.1
    ) {
      f = 13;
    } else if (
      0.1 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.12
    ) {
      f = 12;
    } else if (
      0.12 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.15
    ) {
      f = 11;
    } else if (
      0.15 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.17
    ) {
      f = 10;
    } else if (
      0.17 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.18
    ) {
      f = 9;
    } else if (
      0.18 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.22
    ) {
      f = 8;
    } else if (
      0.22 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.25
    ) {
      f = 7;
    } else if (
      0.25 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.28
    ) {
      f = 6;
    } else if (
      0.28 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.32
    ) {
      f = 5;
    } else if (
      0.32 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.37
    ) {
      f = 4;
    } else if (
      0.37 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.42
    ) {
      f = 3;
    } else if (
      0.42 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.51
    ) {
      f = 2;
    } else if (
      0.51 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.66
    ) {
      f = 1;
    } else if (0.66 < props.observedCumulativeLayoutShift) {
      f = 0;
    }
    const sum = 3 + a + b + c + d + e + f;
    console.log(
      "a : " +
        a +
        " b : " +
        b +
        " c : " +
        c +
        " d : " +
        d +
        " e : " +
        e +
        " f : " +
        f +
        " sum : " +
        sum
    );

    setTotalRate(sum);

    const dataset = {
      firstPaint: "",
      speedIndex: "",
      largestPaint: "",
      interactive: "",
      blockingTime: "",
      layoutShift: "",
    };

    if (props.observedFirstContentfulPaint <= 940) {
      dataset.firstPaint = "good";
    } else if (
      940 < props.observedFirstContentfulPaint &&
      props.observedFirstContentfulPaint <= 1600
    ) {
      dataset.firstPaint = "soso";
    } else {
      dataset.firstPaint = "bad";
    }
    if (props.speedIndex <= 1320) {
      dataset.speedIndex = "good";
    } else if (props.speedIndex && props.speedIndex <= 2310) {
      dataset.speedIndex = "soso";
    } else {
      dataset.speedIndex = "bad";
    }
    if (props.observedLargestContentfulPaint <= 1210) {
      dataset.largestPaint = "good";
    } else if (
      1210 < props.observedLargestContentfulPaint &&
      props.observedLargestContentfulPaint <= 2410
    ) {
      dataset.largestPaint = "soso";
    } else {
      dataset.largestPaint = "bad";
    }
    if (props.interactive <= 2500) {
      dataset.interactive = "good";
    } else if (2500 < props.interactive && props.interactive <= 4520) {
      dataset.interactive = "soso";
    } else {
      dataset.interactive = "bad";
    }
    if (props.totalBlockingTime <= 150) {
      dataset.blockingTime = "good";
    } else if (150 < props.totalBlockingTime && props.totalBlockingTime <= 350) {
      dataset.blockingTime = "soso";
    } else {
      dataset.blockingTime = "bad";
    }
    if (props.observedCumulativeLayoutShift <= 0.1) {
      dataset.layoutShift = "good";
    } else if (
      0.1 < props.observedCumulativeLayoutShift &&
      props.observedCumulativeLayoutShift <= 0.25
    ) {
      dataset.layoutShift = "soso";
    } else {
      dataset.layoutShift = "bad";
    }

    setFirstStat(dataset.firstPaint);
    setSpeed(dataset.speedIndex);
    setLargest(dataset.largestPaint);
    setInter(dataset.interactive);
    setBlock(dataset.blockingTime);
    setLayout(dataset.layoutShift);
  };

  const handlerInput = (e) => {
    setPageUrl(e.target.value);
  };

  return (
    <div className="h-[100%] bg-custom-100">
      <Header2 />
      <nav className="flex-col w-full  bg-gray-500 shadow-lg">
        <div
          className={
            sended
              ? "mx-auto justify-center items-center container flex"
              : " mx-auto justify-center items-center container flex pt-14"
          }
        >
          <p className={sended ? "hidden" : "text-2xl text-gray-100"}>
            웹 페이지 성능을 알아볼까요 ?
          </p>
        </div>

        <div
          className={
            sended
              ? "container h-40 flex items-center justify-center  mx-auto "
              : "container h-28 flex items-center justify-center  mx-auto pt-10"
          }
        >
          <form>
            <input
              className="text-sm h-9 w-[380px] px-4 mb-2 text-gray-700 placeholder-gray-600 border outline-none rounded-sm "
              type="text"
              placeholder="웹 페이지 URL 입력"
              value={pageUrl}
              onChange={handlerInput}
            />
            <button
              type="submit"
              className="transition transform duration-700 ease-in-out h-9 w-14 bg-gray-600 ml-2 text-white text-sm rounded-sm hover:bg-white hover:text-black hover:opacity-100 "
              onClick={run}
            >
              분석
            </button>
          </form>
        </div>
      </nav>
      {sended ? (
        <section className="flex mt-8 bg-custom-100 h-[100%]">
          <div className="w-full flex-row mx-auto justify-center items-center ">
            <div style={{ width: 120, height: 120 }} className="mx-auto">
              <AnimatedProgressProvider
                valueStart={0}
                valueEnd={totalRate}
                // valueEnd={90}
                duration={1.4}
                easingFunction={easeQuadInOut}
              >
                {(value) => {
                  const roundedValue = Math.round(value);
                  return (
                    <CircularProgressbar
                      value={value}
                      text={`${roundedValue}%`}
                      background
                      styles={
                        0 <= totalRate && totalRate <= 49
                          ? buildStyles({
                              pathTransition: "none",
                              pathColor: "#ff4500",
                              textColor: "#ff4500",
                              trailColor: "#ffcccc",
                              backgroundColor: "#ffcccc",
                            })
                          : 50 <= totalRate && totalRate <= 89
                          ? buildStyles({
                              pathTransition: "none",
                              pathColor: "#ffa500",
                              textColor: "#ffa500",
                              trailColor: "#fff1d9",
                              backgroundColor: "#fff1d9",
                            })
                          : buildStyles({
                              pathTransition: "none",
                              pathColor: "#32cd32",
                              textColor: "#32cd32",
                              trailColor: "#e6ffe8",
                              backgroundColor: "#e6ffe8",
                            })
                      }
                    />
                  );
                }}
              </AnimatedProgressProvider>
            </div>
            <div className=" mx-auto justify-center align-middle items-center mt-5 ">
              <div className="flex justify-center align-middle items-center mb-3">
                <p
                  className="text-2xl font-normal cursor-pointer text-gray-700"
                  onClick={() => {
                    window.open(`${pageUrl}`, "_blank");
                  }}
                >
                  {settingUrl}
                </p>
              </div>

              <div className="flex justify-center align-middle items-center">
                <div className="w-[345px] h-[42px] flex justify-center align-middle items-center border rounded-full">
                  <div className="flex mr-6">
                    <ExclamationIcon className="h-6 text-red-500" />
                    <p className="ml-3">0 - 49</p>
                  </div>
                  <div className="flex mr-6">
                    <DuplicateIcon className="h-6 text-yellow-500" />
                    <p className="ml-3">50 - 89</p>
                  </div>
                  <div className="flex mr-5">
                    <CheckCircleIcon className="h-6 text-green-500" />
                    <p className="ml-3">90 - 100</p>
                  </div>
                  <div
                    className="flex cursor-pointer"
                    onClick={() => {
                      window.open(`https://web.dev/performance-scoring/`, "_blank");
                    }}
                  >
                    <InformationCircleIcon className="h-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-8" />
            <div className="hidden md:flex md:mx-auto md:justify-center md:align-middle md:items-center  md:mt-8">
              <p className="text-lg font-bold">측정 데이터</p>
              <p className="flex text-gray-500 ml-3"> - </p>
              <p className=" text-gray-500 ml-1"> 측정항목은 </p>
              <p
                className="text-blue-700 ml-1 font-bold cursor-pointer"
                onClick={() => {
                  window.open(`https://developers.google.com/web/tools/lighthouse/`, "_blank");
                }}
              >
                {" "}
                Lighthouse{" "}
              </p>
              <p className="text-gray-500 ml-1">에서 수집 및 분석한</p>
              <p
                className="font-bold ml-1 text-blue-700 cursor-pointer"
                onClick={() => {
                  window.open(
                    `https://developers.google.com/speed/docs/insights/v5/about#lab`,
                    "_blank"
                  );
                }}
              >
                실험실 데이터
              </p>
              <p className=" text-gray-500 pb-4">를 토대로 합니다.</p>
            </div>
            <div className="mx-auto justify-center align-middle items-center mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 ">
                <div className="w-[350px] h-[120px] mx-auto lg:ml-[30%] xl:ml-[40%] 2xl:ml-[52%]">
                  <hr className="mb-2" />
                  {firstStat === "good" ? (
                    <>
                      <div className="flex mr-5 justify-between ">
                        <div className="flex">
                          <CheckCircleIcon className="h-6 text-green-500 mt-1" />
                          <p className="ml-3 text-lg font-bold">First Contentful Paint (FCP)</p>
                        </div>
                        <div className="">
                          <p className="text-lg font-bold text-green-500">
                            {realDataSec.firstPaint} 초
                          </p>
                        </div>
                      </div>
                      <div className="w-[228px] ml-9 mt-2">
                        <p>
                          콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는 시간을
                          나타냅니다.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {firstStat === "soso" ? (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <DuplicateIcon className="h-6 text-yellow-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">First Contentful Paint (FCP)</p>
                            </div>
                            <div className="flex">
                              <p className="text-lg font-bold text-yellow-500">
                                {realDataSec.firstPaint} 초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는
                              시간을 나타냅니다.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <ExclamationIcon className="h-6 text-red-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">First Contentful Paint (FCP)</p>
                            </div>
                            <div className="flex">
                              <p className="text-lg font-bold text-red-500">
                                {realDataSec.firstPaint} 초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는
                              시간을 나타냅니다.
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="w-[350px] h-[120px] mx-auto lg:mr-[30%] xl:mr-[40%] 2xl:mr-[52%]">
                  <hr className="mb-2" />
                  {inter === "good" ? (
                    <>
                      <div className="flex mr-5 justify-between ">
                        <div className="flex">
                          <CheckCircleIcon className="h-6 text-green-500 mt-1" />
                          <p className="ml-3 text-lg font-bold">Time to Interactive</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-500">
                            {realDataSec.interactive} 초
                          </p>
                        </div>
                      </div>
                      <div className="w-[228px] ml-9 mt-2">
                        <p>
                          사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게 될
                          때까지 걸리는 시간입니다.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {inter === "soso" ? (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <DuplicateIcon className="h-6 text-yellow-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Time to Interactive</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-yellow-500">
                                {realDataSec.interactive} 초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게
                              될 때까지 걸리는 시간입니다.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <ExclamationIcon className="h-6 text-red-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Time to Interactive</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-red-500">
                                {realDataSec.interactive} 초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게
                              될 때까지 걸리는 시간입니다.
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="w-[350px] h-[120px] mx-auto lg:ml-[30%] xl:ml-[40%] 2xl:ml-[52%]">
                  <hr className="mb-2" />
                  {speed === "good" ? (
                    <>
                      <div className="flex mr-5 justify-between ">
                        <div className="flex">
                          <CheckCircleIcon className="h-6 text-green-500 mt-1" />
                          <p className="ml-3 text-lg font-bold">Speed Index</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-500">
                            {realDataSec.speedIndex} 초
                          </p>
                        </div>
                      </div>
                      <div className="w-[228px] ml-9 mt-2">
                        <p>속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {speed === "soso" ? (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <DuplicateIcon className="h-6 text-yellow-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Speed Index</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-yellow-500">
                                {realDataSec.speedIndex} 초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <ExclamationIcon className="h-6 text-red-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Speed Index</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-red-500">
                                {realDataSec.speedIndex} 초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.</p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="w-[350px] h-[120px] mx-auto lg:mr-[30%] xl:mr-[40%] 2xl:mr-[52%]">
                  <hr className="mb-2" />
                  {block === "good" ? (
                    <>
                      <div className="flex mr-5 justify-between ">
                        <div className="flex">
                          <CheckCircleIcon className="h-6 text-green-500 mt-1" />
                          <p className="ml-3 text-lg font-bold">Total Blocking Time</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-500">
                            {realDataSec.blockingTime} 밀리초
                          </p>
                        </div>
                      </div>
                      <div className="w-[228px] ml-9 mt-2">
                        <p>
                          FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를
                          넘으면 밀리초 단위로 표현됩니다.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {block === "soso" ? (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <DuplicateIcon className="h-6 text-yellow-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Total Blocking Time</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-yellow-500">
                                {realDataSec.blockingTime} 밀리초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를
                              넘으면 밀리초 단위로 표현됩니다.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <ExclamationIcon className="h-6 text-red-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Total Blocking Time</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-red-500">
                                {realDataSec.blockingTime} 밀리초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를
                              넘으면 밀리초 단위로 표현됩니다.
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="w-[350px] h-[120px] mx-auto lg:ml-[30%] xl:ml-[40%] 2xl:ml-[52%]">
                  <hr className="mb-2" />
                  {largest === "good" ? (
                    <>
                      <div className="flex mr-5 justify-between ">
                        <div className="flex">
                          <CheckCircleIcon className="h-6 text-green-500 mt-1" />
                          <p className="ml-3 text-lg font-bold">Largest Contentful Paint</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-500">
                            {realDataSec.largestPaint} 초
                          </p>
                        </div>
                      </div>
                      <div className="w-[228px] ml-9 mt-2">
                        <p>
                          콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는 시간을
                          나타냅니다.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {largest === "soso" ? (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <DuplicateIcon className="h-6 text-yellow-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Largest Contentful Paint</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-yellow-500">
                                {realDataSec.largestPaint} 초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는
                              시간을 나타냅니다.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <ExclamationIcon className="h-6 text-red-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Largest Contentful Paint</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-red-500">
                                {realDataSec.largestPaint} 초
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는
                              시간을 나타냅니다.
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="w-[350px] h-[120px] mx-auto lg:mr-[30%] xl:mr-[40%] 2xl:mr-[52%]">
                  <hr className="mb-2" />
                  {layout === "good" ? (
                    <>
                      <div className="flex mr-5 justify-between ">
                        <div className="flex">
                          <CheckCircleIcon className="h-6 text-green-500 mt-1" />
                          <p className="ml-3 text-lg font-bold">Cumulative Layout Shift</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-500">
                            {realDataSec.layoutShift}
                          </p>
                        </div>
                      </div>
                      <div className="w-[228px] ml-9 mt-2">
                        <p>누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {layout === "soso" ? (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <DuplicateIcon className="h-6 text-yellow-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Cumulative Layout Shift</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-yellow-500">
                                {realDataSec.layoutShift}
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex mr-5 justify-between">
                            <div className="flex">
                              <ExclamationIcon className="h-6 text-red-500 mt-1" />
                              <p className="ml-3 text-lg font-bold">Cumulative Layout Shift</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-red-500">
                                {realDataSec.layoutShift}
                              </p>
                            </div>
                          </div>
                          <div className="w-[228px] ml-9 mt-2">
                            <p>
                              누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.
                              <br />
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="h-[100%] bg-custom-100 ">
          <UnSended onLoading={onLoading} />
        </section>
      )}

      <Footer />
    </div>
  );
};

export default withAuth(Performance);
