import { createSlice } from "@reduxjs/toolkit";
import { COLLECTIONS } from "../../constants";
import { readData, sendData, deleteData } from "../../services/api";
import { AppDispatch } from "../index";
import { MissingProductsDoc } from "../../interfaces/database";
import { MissingProductsInitialState } from "../../interfaces/redux-store";
import { dateMe, resetDate } from "../../helpers/functions";

const initialState: MissingProductsInitialState = {
  isLoading: false,
  error: null,
  data: [],
  dailyMissingProducts: [],
};

const missingProductsSlice = createSlice({
  name: "missing-products",
  initialState,
  reducers: {
    fetchingMissingProductsData(state, action) {
      state.isLoading = true;
    },
    errorMissingProductsData(state, action) {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    addMissingProductsData(state, action) {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
      state.dailyMissingProducts = state.data.filter(
        (product) =>
          resetDate(dateMe(product.createdAt)) === resetDate(new Date())
      );
    },
    addMissingProduct(state, action) {
      state.data = state.data.concat(action.payload.data);
      state.dailyMissingProducts = state.data.filter(
        (product) =>
          resetDate(dateMe(product.createdAt)) === resetDate(new Date())
      );
    },
    deleteMissingProduct(state, action) {
      state.data = state.data.filter(
        (product: MissingProductsDoc) => product.id === action.payload.data.id
      );
      state.dailyMissingProducts = state.data.filter(
        (product) =>
          resetDate(dateMe(product.createdAt)) === resetDate(new Date())
      );
    },
  },
});

export const missingProductsActions = missingProductsSlice.actions;

export const addMissingProductsDataToStore =
  () => async (dispatch: AppDispatch) => {
    dispatch(missingProductsActions.fetchingMissingProductsData({}));
    try {
      const missingProductsData = await readData(COLLECTIONS.MISSING_PRODUCTS);
      dispatch(
        missingProductsActions.addMissingProductsData({
          data: missingProductsData,
        })
      );
    } catch (err) {
      dispatch(missingProductsActions.errorMissingProductsData({}));
    }
  };

export const insertMissingProduct =
  (insertData: MissingProductsDoc) => async (dispatch: AppDispatch) => {
    const data = {
      collectionName: COLLECTIONS.MISSING_PRODUCTS,
      data: insertData,
    };

    await sendData(data).then((data) =>
      dispatch(missingProductsActions.addMissingProduct({ data }))
    );
  };

export const deleteMissingProduct =
  (missingProduct: MissingProductsDoc) =>
  async (dispatch: AppDispatch, getState: any) => {
    const stateData = [...getState().missingProducts.data];
    //prettier-ignore
    const onDeleteMissingProduct = await stateData.find((state: MissingProductsDoc) => state.productName === missingProduct.productName);

    if (!!onDeleteMissingProduct) {
      const data = {
        collectionName: COLLECTIONS.MISSING_PRODUCTS,
        docId: onDeleteMissingProduct.id,
      };

      await deleteData(data);
    }
  };

export default missingProductsSlice.reducer;
