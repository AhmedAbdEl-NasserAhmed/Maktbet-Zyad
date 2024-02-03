import React, { useReducer } from "react";
import { BillsDoc, StockDoc } from "../interfaces";

export interface PurchaseBillConfigInitialState {
  searchedProduct: StockDoc;
  searchedProductAmount: number;
  searchedProductOldAmount: number;
  searchedUpdatedProductAmount: number;
  initialProductAmount: number;
  totalNumberOfUnits: number;
}

type PurchaseBillActionType = {
  type: string;
  payload: { data: any };
};

const initialState: PurchaseBillConfigInitialState = {
  searchedProduct: {} as StockDoc,
  searchedProductAmount: 1,
  searchedProductOldAmount: 0,
  searchedUpdatedProductAmount: 0,
  initialProductAmount: 0,
  totalNumberOfUnits: 0,
};

const reducerFn = (
  state: PurchaseBillConfigInitialState = initialState,
  action: PurchaseBillActionType
) => {
  if (action.type === "CHANGE_UPDATED_PRODUCT_AMOUNT") {
    return {
      ...state,
      searchedProductOldAmount: action.payload.data,
      searchedUpdatedProductAmount: action.payload.data,
    };
  }

  return state;
};

const useUpdateBill = (dispatchBillActions: Function, billData?: BillsDoc) => {
  const [billProductsConfig, dispatchBillConfigActions] = useReducer(
    reducerFn,
    initialState
  );

  const onChangeProductAmountHandler = (
    searchedProduct: StockDoc,
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    const targetValue = +target.value;

    const updatedSearchedProductData: any = {
      id: searchedProduct.id,
      productName: searchedProduct.productName,
      category: searchedProduct.category,
      totalProductAmount: targetValue,
      oldProductAmount: searchedProduct.totalProductAmount,
      totalNumberOfUnits: searchedProduct.totalNumberOfUnits,
    };

    updatedSearchedProductData.priceOfUnit = searchedProduct.priceOfUnit;
    if (targetValue > billProductsConfig.searchedProduct.totalNumberOfUnits)
      return;

    //prettier-ignore
    updatedSearchedProductData.totalProductAmount = targetValue;
    //prettier-ignore
    updatedSearchedProductData.initialProductAmount = Math.abs(updatedSearchedProductData.oldProductAmount! - targetValue);

    dispatchBillConfigActions({
      type: "CHANGE_UPDATED_PRODUCT_AMOUNT",
      payload: { data: targetValue },
    });

    dispatchBillActions({
      type: "ADD_PRODUCT",
      payload: { data: updatedSearchedProductData },
    });
  };

  return {
    billProductsConfig,
    onChangeProductAmountHandler,
  };
};

export default useUpdateBill;
