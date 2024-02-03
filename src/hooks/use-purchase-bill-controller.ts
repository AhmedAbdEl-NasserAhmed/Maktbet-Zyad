import { useReducer } from "react";
import { CRUDRequest } from "../constants";
import { StockDoc } from "../interfaces";

export interface PurchaseBillInitialState {
  billSelectedProducts: StockDoc[];
  billTotal: number;
}

type PurchaseBillActionType = {
  type: string;
  payload: { data: any };
};

const usePurchaseBillController = (crudID?: CRUDRequest) => {
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
        (searchedProduct) =>
          searchedProduct.productName === action.payload.data.productName
      );

      let updatedBillProducts: StockDoc[] = [];

      if (searchedProductIndex >= 0) {
        updatedBillProducts = [...state.billSelectedProducts];
        //prettier-ignore

        //prettier-ignore
        updatedBillProducts[searchedProductIndex] = action.payload.data
      } else {
        updatedBillProducts = state.billSelectedProducts.concat(
          action.payload.data
        );
      }

      let updatedBillTotal;

      updatedBillTotal = updatedBillProducts.reduce((acc, cur) => {
        return acc + cur.priceOfPiece * cur.totalProductAmount!;
      }, 0);

      return {
        billSelectedProducts: updatedBillProducts,
        billTotal: updatedBillTotal,
      };
    }
    if (action.type === "REMOVE_PRODUCT") {
      let updatedBillProducts = [...state.billSelectedProducts];
      updatedBillProducts = state.billSelectedProducts.filter(
        (billProduct) =>
          billProduct.productName !== action.payload.data.productName
      );

      let updatedBillTotal;
      updatedBillTotal = updatedBillProducts.reduce((acc, cur) => {
        return acc + cur.priceOfPiece * cur.totalProductAmount!;
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

  return { billProductsData, dispatchBillActions, crudID };
};

export default usePurchaseBillController;
