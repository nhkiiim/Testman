import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/solid";

const LoadTabTable = ({ datas }) => {
  const sumdata = useSelector((state) => state.load.loadResult);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tabIdx, setTabIdx] = useState();

  useEffect(() => {
    sumdata ? setData(sumdata) : null;
  }, [data]);
  // console.log(data);

  const modalAction = (index) => {
    if (showModal) {
      setShowModal(false);
    } else if (!showModal) {
      setShowModal(true);
    }
    setTabIdx(index);
  };

  return (
    <div>
      <div class="overflow-x-auto flex mt-3">
        <table class="table w-[1196px] justify-center mx-auto ">
          <thead>
            <tr>
              <th>No</th>
              <th>총 샘플 개수</th>
              <th>평균 응답 시간</th>
              <th>최단 응답 시간</th>
              <th>최장 응답 시간</th>
              <th>처리량</th>
              <th>에러 개수</th>
              <th>에러율</th>
              <th>초당 보낸 바이트 수</th>
              <th>초당 받은 바이트 수</th>
            </tr>
          </thead>
          <tbody>
            {datas?.map((data, index) => (
              <tr
                className="hover"
                key={index}
                onClick={() => {
                  modalAction(index);
                }}
              >
                <td>
                  <p className="pl-[4px]">{index + 1}</p>
                </td>
                <td>
                  <p className="pl-1">{data.resultSummary.numSamples} 개</p>
                </td>
                <td>
                  <p className="pl-2">{data.resultSummary.avgElapsed} ms</p>
                </td>
                <td>
                  <p className="pl-2">{data.resultSummary.min} ms</p>
                </td>
                <td>
                  <p className="pl-2">{data.resultSummary.max} ms</p>
                </td>
                <td>
                  <p>{data.resultSummary.throughput}</p>
                </td>
                <td>
                  <p className="pl-2">{data.resultSummary.errorCount} 개</p>
                </td>
                <td>
                  <p className="pl-1">{data.resultSummary.errorRate}</p>
                </td>
                <td>
                  <p className="pl-1">{data.resultSummary.receivedPerSec} Bytes</p>
                </td>
                <td>
                  <p className="pl-2">{data.resultSummary.sentPerSec} Bytes</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="flex w-auto  mx-auto ">
              {/*content*/}
              <div className="flex w-[1280px] h-[500px] ">
                <div className="border-0 w-full mx-auto rounded-lg shadow-lg overflow-auto flex flex-col  bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start  p-4 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Detail report</h3>
                    <button
                      className="fixed z-50 p-1 ml-[1200px] bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      <XIcon className="w-8 text-indigo-500 opacity-20 hover:opacity-100" />
                    </button>
                  </div>
                  {/*body*/}
                  <table class="table w-[1250px] justify-center mx-auto mb-[200px] ">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>성공 여부</th>
                        <th>응답 시간</th>
                        <th>스레드 번호</th>
                        <th>스레드 수 (현재 활성 스레드)</th>
                        <th>지연 시간</th>
                        <th>유휴 시간</th>
                        <th>연결 시간</th>
                        <th>실행 시간</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datas[tabIdx].resultRawList?.map((dt, index) => (
                        <tr className="hover" key={index}>
                          <td>
                            <p className="pl-1">{index + 1}</p>
                          </td>
                          <td>
                            <p className="pl-1">{dt.success ? "성공" : "실패"}</p>
                          </td>
                          <td>
                            <p>{dt.elapsed} ms</p>
                          </td>
                          <td>
                            <p className="pl-4">{dt.threadName}</p>
                          </td>
                          <td>
                            <p className="pl-12">{dt.grpThreads}</p>
                          </td>
                          <td>
                            <p>{dt.latency} ms</p>
                          </td>
                          <td>
                            <p className="pl-1">{dt.idleTime} ms</p>
                          </td>
                          <td>
                            <p className="pl-2">{dt.connect} ms</p>
                          </td>
                          <td>
                            <p>{dt.dateTime}</p>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/*footer*/}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default LoadTabTable;
