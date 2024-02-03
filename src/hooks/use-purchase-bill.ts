import { useReducer } from "react";
import { StockDoc } from "../interfaces";

export interface PurchaseBillConfigInitialState {
  searchedProduct: StockDoc;
  searchedProductName: string;
  searchedProductAmount: number;
  searchedProductCategory: string;
  searchedProductPiecePrice: number;
  searchedProductNumberOfUnits: number;
  searchedProductUnitPrice: number;
}

type PurchaseBillActionType = {
  type: string;
  payload: { data: any };
};

const initialState: PurchaseBillConfigInitialState = {
  //
  searchedProduct: {} as StockDoc,
  //
  searchedProductName: "",
  //
  searchedProductAmount: 1,
  //
  searchedProductCategory: "",
  //
  searchedProductPiecePrice: 0,
  //
  searchedProductNumberOfUnits: 0,
  //
  searchedProductUnitPrice: 0,
};

const reducerFn = (
  state: PurchaseBillConfigInitialState = initialState,
  action: PurchaseBillActionType
) => {
  if (action.type === "CHANGE_PRODUCT_NAME") {
    return {
      ...state,
      searchedProductName: action.payload.data,
    };
  }
  if (action.type === "SET_SEARCHED_PRODUCT") {
    return {
      ...state,
      searchedProduct: action.payload.data,
    };
  }
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
  return state;
};

const usePurchaseBill = (
  dispatchBillActions: Function,
  removeNewBillProduct: Function
) => {
  const [billProductsConfig, dispatchBillConfigActions] = useReducer(
    reducerFn,
    initialState
  );

  const onChangeProductNameHandler = (inputProductName: string) => {
    dispatchBillConfigActions({
      type: "CHANGE_PRODUCT_NAME",
      payload: { data: inputProductName },
    });

    // const updatedSearchedProductData: any = {
    //   //prettier-ignore
    //   productName: billProductsConfig.searchedProductName,
    //   //prettier-ignore
    //   category: billProductsConfig.searchedProductCategory,
    //   //prettier-ignore
    //   totalProductAmount: billProductsConfig.searchedProductAmount,
    //   //prettier-ignore
    //   totalNumberOfUnits: billProductsConfig.searchedProductNumberOfUnits,
    //   //prettier-ignore
    //   priceOfPiece: billProductsConfig.searchedProductPiecePrice,
    //   //prettier-ignore
    //   numberOfUnits: billProductsConfig.searchedProductNumberOfUnits,
    //   //prettier-ignore
    //   priceOfUnit: billProductsConfig.searchedProductUnitPrice,
    // };
    //prettier-ignore
    // dispatchBillActions({ type: "ADD_PRODUCT", payload: {data: updatedSearchedProductData} });
  };

  const getSearchValue = (searchedProduct: StockDoc) => {
    const updatedSearchedProductData: any = {
      //prettier-ignore
      productName: !!billProductsConfig.searchedProductName ? billProductsConfig.searchedProductName: searchedProduct.productName,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory,
      //prettier-ignore
      totalProductAmount: billProductsConfig.searchedProductAmount,
      //prettier-ignore
      totalNumberOfUnits: billProductsConfig.searchedProductNumberOfUnits,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice,
    };

    dispatchBillConfigActions({
      type: "SET_SEARCHED_PRODUCT",
      payload: { data: { ...searchedProduct, totalProductAmount: 1 } },
    });

    //prettier-ignore
    dispatchBillActions({ type: "ADD_PRODUCT", payload: {data: updatedSearchedProductData} });
  };

  const onChangeProductCategoryHandler = (
    searchedProduct: StockDoc,
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    const targetValue = target.value;

    dispatchBillConfigActions({
      type: "CHANGE_PRODUCT_CATEGORY",
      payload: { data: targetValue },
    });

    const updatedSearchedProductData: any = {
      // id: searchedProduct.id,
      //prettier-ignore
      productName: !!billProductsConfig.searchedProductName ? billProductsConfig.searchedProductName: searchedProduct.productName,
      category: targetValue,
      totalProductAmount: billProductsConfig.searchedProductAmount,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice,
      // priceOfUnit: billProductsConfig.searchedProduct.priceOfUnit,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice,
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
      productName: !!billProductsConfig.searchedProductName ? billProductsConfig.searchedProductName: searchedProduct.productName,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory,
      totalProductAmount: targetValue,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice,
      // priceOfUnit: billProductsConfig.searchedProduct.priceOfUnit,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice,
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
      productName: !!billProductsConfig.searchedProductName ? billProductsConfig.searchedProductName : searchedProduct.productName,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory,
      totalProductAmount: billProductsConfig.searchedProductAmount,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice,
      // priceOfUnit: billProductsConfig.searchedProduct.priceOfUnit,
      priceOfPiece: targetValue,
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
      productName: !!billProductsConfig.searchedProductName ? billProductsConfig.searchedProductName : searchedProduct.productName,
      totalProductAmount: billProductsConfig.searchedProductAmount,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory,
      //prettier-ignore
      priceOfUnit: billProductsConfig.searchedProductUnitPrice,
      numberOfUnits: targetValue,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice,
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
      productName: !!billProductsConfig.searchedProductName ? billProductsConfig.searchedProductName : searchedProduct.productName,
      //prettier-ignore
      category: billProductsConfig.searchedProductCategory,
      totalProductAmount: billProductsConfig.searchedProductAmount,
      //prettier-ignore
      numberOfUnits: billProductsConfig.searchedProductNumberOfUnits,
      priceOfUnit: targetValue,
      //prettier-ignore
      priceOfPiece: billProductsConfig.searchedProductPiecePrice,
    };

    dispatchBillActions({
      type: "ADD_PRODUCT",
      payload: { data: updatedSearchedProductData },
    });
  };

  const removeProductFromBill = (searchedProduct: StockDoc) => {
    removeNewBillProduct();

    const updatedSearchedProductData = {
      id: searchedProduct.id,
      category: billProductsConfig.searchedProductCategory,
      numberOfUnits: searchedProduct.numberOfUnits,
      priceOfPiece: searchedProduct.priceOfPiece,
      priceOfUnit: searchedProduct.priceOfUnit,
      //prettier-ignore
      productName: !!billProductsConfig.searchedProductName ? billProductsConfig.searchedProductName: searchedProduct.productName,
      totalProductAmount: billProductsConfig.searchedProductAmount,
    };

    //prettier-ignore
    dispatchBillActions({ type: "REMOVE_PRODUCT", payload: {data: updatedSearchedProductData} });
  };

  return {
    billProductsConfig,
    getSearchValue,
    onChangeProductNameHandler,
    onChangeProductCategoryHandler,
    onChangeProductAmountHandler,
    onChangePiecePriceHandler,
    onChangeNumberOfUnitsHandler,
    onChangePriceOfUnit,
    removeProductFromBill,
  };
};

export default usePurchaseBill;
