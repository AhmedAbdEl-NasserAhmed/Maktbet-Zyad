import { createSlice } from "@reduxjs/toolkit";
import { COLLECTIONS } from "../../constants";
import { deleteData, readData, sendData, updateData } from "../../services/api";
import { AppDispatch } from "../index";
import { PurchasesInitialState } from "../../interfaces/redux-store";
import { StockDoc } from "../../interfaces/database";
// import { addStockDataToStore } from "../stock/stock-slice";
import {
  SendRequestData,
  PurchasesDoc,
  UpdateRequestData,
  DeleteRequestData,
} from "../../interfaces";
import { dateMe, resetDate } from "../../helpers/functions";

const initialState: PurchasesInitialState = {
  isLoading: false,
  error: null,
  data: [],
  billSelectedProducts: [],
  total: 0,
  dailyPurchases: [],
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    fetchingPurchasesData(state, action) {
      state.isLoading = true;
    },
    errorPurchasesData(state, action) {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    addPurchasesData(state, action) {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
      state.dailyPurchases = state.data.filter(
        (bill) => resetDate(dateMe(bill.createdAt)) === resetDate(new Date())
      );
    },
    addPurchaseBill(state, action) {
      state.data = state.data.concat(action.payload.data);
      state.dailyPurchases = state.data.filter(
        (bill) => resetDate(dateMe(bill.createdAt)) === resetDate(new Date())
      );
    },
    deletePurchaseBill(state, action) {
      state.data = state.data.filter((bill: PurchasesDoc) => {
        return bill.id !== action.payload.data.id;
      });
      state.dailyPurchases = state.data.filter(
        (bill) => resetDate(dateMe(bill.createdAt)) === resetDate(new Date())
      );
    },
    updatePurchaseBill(state, action) {
      const updatedBillIndex = state.data.findIndex(
        (bill: PurchasesDoc) => bill.id === action.payload.data.id
      );
      state.data[updatedBillIndex] = action.payload.data;
      state.dailyPurchases = state.data.filter(
        (bill) => resetDate(dateMe(bill.createdAt)) === resetDate(new Date())
      );
    },
  },
});

export const purchasesActions = purchasesSlice.actions;

export const addPurchasesDataToStore = () => async (dispatch: AppDispatch) => {
  dispatch(purchasesActions.fetchingPurchasesData({}));
  try {
    const purchasesData = await readData(COLLECTIONS.PURCHASES);
    dispatch(purchasesActions.addPurchasesData({ data: purchasesData }));
  } catch (err) {
    dispatch(purchasesActions.errorPurchasesData({}));
  }
};

export const updatePurchaseBillToStore =
  (purchaseBillData: PurchasesDoc) => async (dispatch: AppDispatch) => {
    try {
      await updateData({
        collectionName: COLLECTIONS.PURCHASES,
        docId: purchaseBillData.id,
        newData: purchaseBillData,
      } as UpdateRequestData).then((_) => {
        // dispatch(addStockDataToStore());
        dispatch(
          purchasesActions.updatePurchaseBill({ data: purchaseBillData })
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

export const deletePurchaseBillFromStore =
  (purchaseBillData: PurchasesDoc) => async (dispatch: AppDispatch) => {
    try {
      // INSERT BILL TO DATABASE
      await deleteData({
        collectionName: COLLECTIONS.PURCHASES,
        docId: purchaseBillData.id,
      } as DeleteRequestData).then((_) => {
        // dispatch(addStockDataToStore());
        dispatch(
          purchasesActions.deletePurchaseBill({ data: purchaseBillData })
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

export const insertPurchaseBill =
  (purchaseBillData: PurchasesDoc) => async (dispatch: AppDispatch) => {
    try {
      // INSERT BILL TO DATABASE
      await sendData({
        collectionName: COLLECTIONS.PURCHASES,
        data: purchaseBillData,
      } as SendRequestData).then((purchaseBillData) => {
        // dispatch(addStockDataToStore());
        dispatch(purchasesActions.addPurchaseBill({ data: purchaseBillData }));
      });
    } catch (err) {
      console.error(err);
    }
  };

export default purchasesSlice.reducer;
