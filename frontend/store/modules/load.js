import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadResult: [], // 모든 결과
  resultSummary: [], // 탭 별 summary 결과
  rawResults: [], // summary seq별 검색했을 때 raw 데이터들 (테이블 클릭 시 상세보기 때 사용)
  summarydatas: {
    // 그래프에 그려줄 DATA들
    avgElapsedList: [
      {
        id: "평균 응답 시간",
        data: [
          {
            x: 0,
            y: 0,
          },
        ],
      },
    ],
    throughputList: [
      {
        id: "처리량",
        data: [
          {
            x: 0,
            y: 0,
          },
        ],
      },
    ],
  },
  calsummary: {
    avgElapsedData: [],
    throughputList: [],
  },
  loop: [],
  thread: [],
};

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    countLoop: (state, action) => {
      state.loop.push(action.payload);
    },
    countThread: (state, action) => {
      state.thread.push(action.payload);
    },
    setLoadResults: (state, action) => {
      state.resultSummary = action.payload;
    },
    addLoadResults: (state, action) => {
      state.loadResult.push(action.payload);
    },
    addLoadSummaryResults: (state, action) => {
      [...state.resultSummary, state.resultSummary.push(action.payload)];
    },
    resetLoadDatas: (state, action) => {
      state.summarydatas = action.payload;
    },
    setSummaryGraphData: (state, action) => {
      state.calsummary = action.payload;
    },
    addElapsed: (state, action) => {},
  },
});

export const {
  setLoadResults,
  addLoadResults,
  resetLoadDatas,
  setResData,
  addLoadSummaryResults,
  setSummaryGraphData,
  addElapsed,
  countLoop,
  countThread,
} = loadSlice.actions;
export default loadSlice.reducer;
