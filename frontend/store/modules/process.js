import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  processData: {
    cumulativeLayoutShift: 0,
    cumulativeLayoutShiftMainFrame: 0,
    firstContentfulPaint: 0,
    firstMeaningfulPaint: 0,
    interactive: 0,
    largestContentfulPaint: 0,
    maxPotentialFID: 0,
    observedCumulativeLayoutShift: 0,
    observedCumulativeLayoutShiftMainFrame: 0,
    observedDomContentLoaded: 0,
    observedDomContentLoadedTs: 0,
    observedFirstContentfulPaint: 0,
    observedFirstContentfulPaintAllFrames: 0,
    observedFirstContentfulPaintAllFramesTs: 0,
    observedFirstContentfulPaintTs: 0,
    observedFirstMeaningfulPaint: 0,
    observedFirstMeaningfulPaintTs: 0,
    observedFirstPaint: 0,
    observedFirstPaintTs: 0,
    observedFirstVisualChange: 0,
    observedFirstVisualChangeTs: 0,
    observedLargestContentfulPaint: 0,
    observedLargestContentfulPaintAllFrames: 0,
    observedLargestContentfulPaintAllFramesTs: 0,
    observedLargestContentfulPaintTs: 0,
    observedLastVisualChange: 0,
    observedLastVisualChangeTs: 0,
    observedLoad: 0,
    observedLoadTs: 0,
    observedNavigationStart: 0,
    observedNavigationStartTs: 0,
    observedSpeedIndex: 0,
    observedSpeedIndexTs: 0,
    observedTimeOrigin: 0,
    observedTimeOriginTs: 0,
    observedTotalCumulativeLayoutShift: 0,
    observedTraceEnd: 0,
    observedTraceEndTs: 0,
    speedIndex: 0,
    totalBlockingTime: 0,
    totalCumulativeLayoutShift: 0,
  },
  dataStat: {
    firstPaint: "",
    speedIndex: "",
    largestPaint: "",
    interactive: "",
    blockingTime: "",
    layoutShift: "",
  },
};

const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    setProcessState: (state, action) => {
      const url = action.payload;
      state.url = url;
    },
    setProcessData: (state, action) => {
      state.processData = action.payload;
    },
    setProcessDataStat: (state, action) => {
      const { firstPaint, speedIndex, largestPaint, interactive, blockingTime, layoutShift } =
        action.payload;
      state.dataStat.firstPaint = firstPaint;
      state.dataStat.speedIndex = speedIndex;
      state.dataStat.largestPaint = largestPaint;
      state.dataStat.interactive = interactive;
      state.dataStat.blockingTime = blockingTime;
      state.dataStat.layoutShift = layoutShift;
    },
  },
});

export const { setProcessState, setProcessData, setProcessDataStat } = processSlice.actions;
export default processSlice.reducer;
