import { Line } from "@nivo/line";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { select } from "@storybook/addon-knobs";

const LoadGraphSummary = () => {
  // const sumdata = useSelector((state) => state.load.summaryGraphData);
  // console.log(sumdata);

  // const commonProperties = {
  //   width: 900,
  //   height: 400,
  //   margin: { top: 20, right: 20, bottom: 60, left: 80 },
  //   data: sumdata.avgElapsedList,
  //   animate: true,
  //   enableSlices: "x",
  // };
  // const commonProperties2 = {
  //   width: 900,
  //   height: 400,
  //   margin: { top: 20, right: 20, bottom: 60, left: 80 },
  //   data: sumdata.throughputList,
  //   animate: true,
  //   enableSlices: "x",
  // };

  // console.log(commonProperties.data);
  // const curveOptions = ["linear", "monotoneX", "step", "stepBefore", "stepAfter"];

  return (
    <div>
      {/* <Line
        {...commonProperties}
        yScale={{
          type: "linear",
          stacked: false,
        }}
        curve={select("curve", curveOptions, "linear")}
      />
      <Line
        {...commonProperties2}
        yScale={{
          type: "linear",
          stacked: false,
        }}
        curve={select("curve", curveOptions, "linear")}
      /> */}
    </div>
  );
};

export default LoadGraphSummary;
