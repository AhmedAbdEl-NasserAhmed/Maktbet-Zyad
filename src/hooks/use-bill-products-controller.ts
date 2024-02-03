import { useReducer } from "react";
import { StockDoc } from "../interfaces";

export interface PurchaseBillInitialState {
  billSelectedProducts: StockDoc[];
  billTotal: number;
}

type PurchaseBillActionType = {
  type: string;
  payload: { data: any };
};

const useBillProductsController = () => {
  const initialState: PurchaseBillInitialState = {
    billSelectedProducts: [],
    billTotal: 0,
  };

  const reducerFn = (
    state: PurchaseBillInitialState = initialState,
    action: PurchaseBillActionType
  ) => {
    if (action.type === "ADD_PRODUCT") {
      const searchedProductIndex = [...state.billSelectedProducts].findIndex(
        (searchedProduct) => searchedProduct.id === action.payload.data.id
      );

      let updatedBillProducts: StockDoc[] = [];

      if (searchedProductIndex >= 0) {
        updatedBillProducts = [...state.billSelectedProducts];

        //prettier-ignore
        updatedBillProducts[searchedProductIndex] = action.payload.data
      } else {
        updatedBillProducts = state.billSelectedProducts.concat(
          action.payload.data
        );
      }

      const updatedBillTotal = updatedBillProducts.reduce((acc, cur) => {
        return acc + cur.priceOfUnit * cur.totalProductAmount!;
      }, 0);

      return {
        billSelectedProducts: updatedBillProducts,
        billTotal: updatedBillTotal,
      };
    }
    if (action.type === "REMOVE_PRODUCT") {
      let updatedBillProducts = state.billSelectedProducts.filter(
        (billProduct) => billProduct.id !== action.payload.data.id
      );

      let updatedBillTotal = updatedBillProducts.reduce((acc, cur) => {
        return acc + cur.priceOfUnit * cur.totalProductAmount!;
      }, 0);

      return {
        billSelectedProducts: updatedBillProducts,
        billTotal: updatedBillTotal,
      };
    }

    return state;
  };
  const [billProductsData, dispatchBillActions] = useReducer(
    reducerFn,
    initialState
  );

  return { billProductsData, dispatchBillActions };
};

export default useBillProductsController;
