import React, { useReducer } from "react";
import { BillsDoc, StockDoc } from "../interfaces";

export interface PurchaseBillConfigInitialState {
  searchedProduct: StockDoc;
  searchedProductAmount: number;
  searchedProductOldAmount: number;
  searchedProductPiecePrice: number;
  searchedUpdatedProductAmount: number;
  searchedProductNumberOfUnits: 0;
  searchedProductCategory: string;
  searchedProductUnitPrice: number;
}

type PurchaseBillActionType = {
  type: string;
  payload: { data: any };
};

const initialState: PurchaseBillConfigInitialState = {
  searchedProduct: {} as StockDoc,
  searchedProductAmount: 0,
  searchedProductOldAmount: 0,
  searchedProductPiecePrice: 0,
  searchedUpdatedProductAmount: 0,
  searchedProductNumberOfUnits: 0,
  searchedProductCategory: "",
  searchedProductUnitPrice: 0,
};

const reducerFn = (
  state: PurchaseBillConfigInitialState = initialState,
  action: PurchaseBillActionType
) => {
  if (action.type === "CHANGE_PRODUCT_CATEGORY") {
    return {
      ...state,
      searchedProductCategory: action.payload.data,
    };
  }
  if (action.type === "CHANGE_PRODUCT_AMOUNT") {
    return {
      ...state,
      searchedProductAmount: action.payload.data,
    };
  }
  if (action.type === "CHANGE_PIECE_PRICE") {
    return {
      ...state,
      searchedProductPiecePrice: action.payload.data,
    };
  }
  if (action.type === "CHANGE_UNITS_NUMBER") {
    return {
      ...state,
      searchedProductNumberOfUnits: action.payload.data,
    };
  }
  if (action.type === "CHANGE_UNIT_PRICE") {
    return {
      ...state,
      searchedProductUnitPrice: action.payload.data,
    };
  }
  if (action.type === "CHANGE_UPDATED_PRODUCT_AMOUNT") {
    return {
      ...state,
      searchedProductOldAmount: action.payload.data,
      searchedUpdatedProductAmount: action.payload.data,
    };
  }

  return state;
};

const useUpdatePurchaseBill = (
  dispatchBillActions: Function,
  billData?: BillsDoc
) => {
  const [billProductsConfig, dispatchBillConfigActions] = useReducer(
    reducerFn,
    initialState
  );

  const onChangeProductCategoryHandler = (
    searchedProduct: StockDoc,
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    const target = event.target as HTMLSelectElement;
    const targetValue = target.value;

    dispatchBillConfigActions({
      type: "CHANGE_PRODUCT_CATEGORY",
      payload: { data: targetValue },
    });

    const updatedSearchedProductData: any = {
      // id: searchedProduct.id,
      //prettier-ignore
      productName: searchedProduct.productName,
      //prettier-ignore
      category: targetValue,
      //prettier-ignore
      totalProductAmount: billProductsConfig.searchedProductAmount ? billProductsConfig.searchedProductAmount : searchedProduct.totalProductAmount,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits ? billProductsConfig.searchedProductNumberOfUnits : searchedProduct.numberOfUnits,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice ? billProductsConfig.searchedProductUnitPrice : searchedProduct.priceOfUnit,
      // priceOfUnit: searchedProduct.searchedProduct.priceOfUnit,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice ? billProductsConfig.searchedProductPiecePrice : searchedProduct.priceOfPiece,
      //prettier-ignore
      oldProductAmount: searchedProduct.numberOfUnits * searchedProduct.totalProductAmount!,
    };

    dispatchBillActions({
      type: "ADD_PRODUCT",
      payload: { data: updatedSearchedProductData },
    });
  };

  const onChangeProductAmountHandler = (
    searchedProduct: StockDoc,
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    const targetValue = +target.value;

    dispatchBillConfigActions({
      type: "CHANGE_PRODUCT_AMOUNT",
      payload: { data: targetValue },
    });

    const updatedSearchedProductData: any = {
      // id: searchedProduct.id,
      //prettier-ignore
      productName: searchedProduct.productName,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory ? billProductsConfig.searchedProductCategory : searchedProduct.category,
      //prettier-ignore
      totalProductAmount: targetValue,
      // totalProductAmount: billProductsConfig.searchedProductAmount ?  billProductsConfig.searchedProductAmount : targetValue,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits ? billProductsConfig.searchedProductNumberOfUnits : searchedProduct.numberOfUnits,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice ? billProductsConfig.searchedProductUnitPrice : searchedProduct.priceOfUnit,
      // priceOfUnit: searchedProduct.searchedProduct.priceOfUnit,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice ? billProductsConfig.searchedProductPiecePrice : searchedProduct.priceOfPiece,
      //prettier-ignore
      oldProductAmount: searchedProduct.numberOfUnits * searchedProduct.totalProductAmount!,
    };

    dispatchBillActions({
      type: "ADD_PRODUCT",
      payload: { data: updatedSearchedProductData },
    });
  };

  const onChangePiecePriceHandler = (
    searchedProduct: StockDoc,
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    const targetValue = +target.value;

    dispatchBillConfigActions({
      type: "CHANGE_PIECE_PRICE",
      payload: { data: targetValue },
    });
    const updatedSearchedProductData: any = {
      // id: searchedProduct.id,
      //prettier-ignore
      productName: searchedProduct.productName,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory ? billProductsConfig.searchedProductCategory : searchedProduct.category,
      //prettier-ignore
      totalProductAmount: billProductsConfig.searchedProductAmount ? billProductsConfig.searchedProductAmount : searchedProduct.totalProductAmount,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits ? billProductsConfig.searchedProductNumberOfUnits : searchedProduct.numberOfUnits,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice ? billProductsConfig.searchedProductUnitPrice : searchedProduct.priceOfUnit,
      // priceOfUnit: searchedProduct.searchedProduct.priceOfUnit,
      //prettier-ignore
      priceOfPiece: targetValue,
      //prettier-ignore
      oldProductAmount: searchedProduct.numberOfUnits * searchedProduct.totalProductAmount!,
    };

    dispatchBillActions({
      type: "ADD_PRODUCT",
      payload: { data: updatedSearchedProductData },
    });
  };

  const onChangeNumberOfUnitsHandler = (
    searchedProduct: StockDoc,
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    const targetValue = +target.value;

    dispatchBillConfigActions({
      type: "CHANGE_UNITS_NUMBER",
      payload: { data: targetValue },
    });

    const updatedSearchedProductData: any = {
      // id: searchedProduct.id,
      //prettier-ignore
      productName: searchedProduct.productName,
      //prettier-ignore
      totalProductAmount: billProductsConfig.searchedProductAmount ? billProductsConfig.searchedProductAmount : searchedProduct.totalProductAmount,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory ? billProductsConfig.searchedProductCategory : searchedProduct.category,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice ? billProductsConfig.searchedProductUnitPrice : searchedProduct.priceOfUnit,
      //prettier-ignore
      numberOfUnits: targetValue,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice ? billProductsConfig.searchedProductPiecePrice : searchedProduct.priceOfPiece,
      //prettier-ignore
      oldProductAmount: searchedProduct.numberOfUnits * searchedProduct.totalProductAmount!,
    };

    dispatchBillActions({
      type: "ADD_PRODUCT",
      payload: { data: updatedSearchedProductData },
    });
  };

  const onChangePriceOfUnit = (
    searchedProduct: StockDoc,
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    const targetValue = +target.value;

    dispatchBillConfigActions({
      type: "CHANGE_UNIT_PRICE",
      payload: { data: targetValue },
    });

    const updatedSearchedProductData: any = {
      // id: searchedProduct.id,
      //prettier-ignore
      productName: searchedProduct.productName,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory ? billProductsConfig.searchedProductCategory : searchedProduct.category,
      //prettier-ignore
      totalProductAmount: billProductsConfig.searchedProductAmount ? billProductsConfig.searchedProductAmount : searchedProduct.totalProductAmount,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits ? billProductsConfig.searchedProductNumberOfUnits : searchedProduct.numberOfUnits,
      //prettier-ignore
      priceOfUnit: targetValue,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice ? billProductsConfig.searchedProductPiecePrice : searchedProduct.priceOfPiece,
      //prettier-ignore
      oldProductAmount: searchedProduct.numberOfUnits * searchedProduct.totalProductAmount!,
    };

    dispatchBillActions({
      type: "ADD_PRODUCT",
      payload: { data: updatedSearchedProductData },
    });
  };

  return {
    billProductsConfig,
    onChangeProductCategoryHandler,
    onChangeProductAmountHandler,
    onChangePiecePriceHandler,
    onChangeNumberOfUnitsHandler,
    onChangePriceOfUnit,
  };
};

export default useUpdatePurchaseBill;
