import { createSlice } from "@reduxjs/toolkit";
import { COLLECTIONS } from "../../constants";
import { readData, sendData } from "../../services/api";
import { AppDispatch } from "../index";
import { ReportsDoc } from "../../interfaces/database";
import { HttpInitialState } from "../../interfaces";

const initialState: HttpInitialState<ReportsDoc> = {
  isLoading: false,
  error: null,
  data: [],
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    fetchingReportsData(state, action) {
      state.isLoading = true;
    },
    errorReportsData(state, action) {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    fetchReportsData(state, action) {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    addReport(state, action) {
      state.data = state.data.concat(action.payload.data);
    },
  },
});

export const reportsActions = reportsSlice.actions;

export const addReports = () => async (dispatch: AppDispatch) => {
  dispatch(reportsActions.fetchingReportsData({}));
  try {
    const reportsData = await readData(COLLECTIONS.REPORTS);
    dispatch(
      reportsActions.fetchReportsData({
        data: reportsData,
      })
    );
  } catch (err) {
    dispatch(reportsActions.errorReportsData({}));
  }
};

export const insertReport =
  (insertData: ReportsDoc) => async (dispatch: AppDispatch) => {
    try {
      const data = {
        collectionName: COLLECTIONS.REPORTS,
        data: insertData,
      };
      await sendData(data).then((data) =>
        dispatch(reportsActions.addReport({ data: data }))
      );
    } catch (err) {
      console.error(err);
    }
  };

export default reportsSlice.reducer;
