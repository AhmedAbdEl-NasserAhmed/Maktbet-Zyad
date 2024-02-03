import { createSlice } from "@reduxjs/toolkit";
import { COLLECTIONS } from "../../constants";
import { readData, sendData, deleteData, updateData } from "../../services/api";
import { AppDispatch } from "../index";
import {
  DeleteRequestData,
  OutlaysDoc,
  UpdateRequestData,
} from "../../interfaces/database";
import { OutlaysInitialState } from "../../interfaces/redux-store";
import { dateMe, resetDate } from "../../helpers/functions";

const initialState: OutlaysInitialState = {
  isLoading: false,
  error: null,
  data: [],
  dailyOutlays: [],
  dailyOutlaysTotal: 0,
};

const outlaysSlice = createSlice({
  name: "outlays",
  initialState,
  reducers: {
    fetchingOutlaysData(state, action) {
      state.isLoading = true;
    },
    errorOutlaysData(state, action) {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    addOutlaysData(state, action) {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
      state.dailyOutlays = state.data.filter(
        (outlay) =>
          resetDate(dateMe(outlay.createdAt)) === resetDate(new Date())
      );
      state.dailyOutlaysTotal = state.dailyOutlays.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );
    },
    addOutlay(state, action) {
      state.data = state.data.concat(action.payload.data);
      state.dailyOutlays = state.data.filter(
        (outlay) =>
          resetDate(dateMe(outlay.createdAt)) === resetDate(new Date())
      );
      state.dailyOutlaysTotal = state.dailyOutlays.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );
    },
    deleteOutlay(state, action) {
      state.data = state.data.filter(
        (outlay: OutlaysDoc) => outlay.id !== action.payload.data.id
      );
      state.dailyOutlays = state.data.filter(
        (outlay) =>
          resetDate(dateMe(outlay.createdAt)) === resetDate(new Date())
      );
      state.dailyOutlaysTotal = state.dailyOutlays.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );
    },
    updateOutlay(state, action) {
      const outlayIndex = state.data.findIndex((outlay: OutlaysDoc) => {
        return outlay.id === action.payload.data.id;
      });
      state.data[outlayIndex] = action.payload.data;
      state.dailyOutlays = state.data.filter(
        (outlay) =>
          resetDate(dateMe(outlay.createdAt)) === resetDate(new Date())
      );
      state.dailyOutlaysTotal = state.dailyOutlays.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );
    },
  },
});

export const outlaysActions = outlaysSlice.actions;

export const addOutlays = () => async (dispatch: AppDispatch) => {
  dispatch(outlaysActions.fetchingOutlaysData({}));
  try {
    const outlaysData = await readData(COLLECTIONS.OUTLAYS);
    dispatch(
      outlaysActions.addOutlaysData({
        data: outlaysData,
      })
    );
  } catch (err) {
    dispatch(outlaysActions.errorOutlaysData({}));
  }
};

export const insertOutlay =
  (insertData: OutlaysDoc) => async (dispatch: AppDispatch) => {
    try {
      const data = {
        collectionName: COLLECTIONS.OUTLAYS,
        data: insertData,
      };
      await sendData(data).then((data) => {
        dispatch(outlaysActions.addOutlay({ data: data }));
      });
    } catch (err) {
      console.error(err);
    }
  };

export const updateOutlayAction =
  (outlay: OutlaysDoc) => async (dispatch: AppDispatch) => {
    try {
      await updateData({
        collectionName: COLLECTIONS.OUTLAYS,
        docId: outlay.id,
        newData: outlay,
      } as UpdateRequestData).then((_) =>
        dispatch(outlaysActions.updateOutlay({ data: outlay }))
      );
    } catch (err) {
      console.error(err);
    }
  };

export const deleteOutlayAction =
  (outlay: OutlaysDoc) => async (dispatch: AppDispatch) => {
    try {
      await deleteData({
        collectionName: COLLECTIONS.OUTLAYS,
        docId: outlay.id,
      } as DeleteRequestData).then((_) =>
        dispatch(outlaysActions.deleteOutlay({ data: outlay }))
      );
    } catch (err) {
      console.error(err);
    }
  };

export default outlaysSlice.reducer;
