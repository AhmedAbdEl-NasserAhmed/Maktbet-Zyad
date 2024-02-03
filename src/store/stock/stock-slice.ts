import { createSlice } from "@reduxjs/toolkit";
import {
  COLLECTIONS,
  SnackbarFailed,
  SnackbarType,
  SnackbarWarning,
} from "../../constants";
import {
  BillsDoc,
  DeleteRequestData,
  MissingProductsDoc,
  StockDoc,
} from "../../interfaces";
import { StockInitialState } from "../../interfaces/redux-store";
import { deleteData, readData, sendData, updateData } from "../../services/api";
import { AppDispatch } from "../index";
import {
  deleteMissingProduct,
  insertMissingProduct,
} from "../missing-products/missing-products-slice";
import { snackbarActions } from "../snackbar/snackbar-slice";

const calculateProfits = (stockProduct: StockDoc) => {
  let profitOfUnitEquation, totalProfitEquation, profitPercentEquation;
  //prettier-ignore
  const { numberOfUnits, priceOfPiece, priceOfUnit, totalNumberOfUnits } = stockProduct;
  //prettier-ignore
  const profit = (numberOfUnits * priceOfUnit) - priceOfPiece;
  profitOfUnitEquation = profit / numberOfUnits;
  //prettier-ignore
  totalProfitEquation = (profit / priceOfPiece) * ((totalNumberOfUnits / numberOfUnits) * priceOfPiece);
  //prettier-ignore
  profitPercentEquation = (profit / priceOfPiece) * 100;

  stockProduct.profitOfPiece = profit;
  stockProduct.profitOfUnit = +profitOfUnitEquation.toFixed(2);
  stockProduct.totalProfit = totalProfitEquation;
  stockProduct.profitPercent = profitPercentEquation;
  return stockProduct;
};

const initialState: StockInitialState = {
  isLoading: false,
  error: null,
  data: [],
  productsInStore: [],
  filteredStockData: [],
  totalProductsBudget: 0,
  totalProductsProfit: 0,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchingStockData(state, action) {
      state.isLoading = true;
    },
    errorStockData(state, action) {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    addStockData(state, action) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload.data;
      state.filteredStockData = action.payload.data.filter(
        (product: StockDoc) => product.totalNumberOfUnits > 0
      );
      state.productsInStore = action.payload.data.filter(
        (product: StockDoc) => product.totalNumberOfUnits > 0
      );
      state.totalProductsBudget = state.data.reduce((acc, cur) => {
        return (
          acc + (cur.totalNumberOfUnits / cur.numberOfUnits) * cur.priceOfPiece
        );
      }, 0);
      state.totalProductsProfit = state.data.reduce((acc, cur) => {
        return acc + cur.totalNumberOfUnits * cur.priceOfUnit;
      }, 0);
    },
    addProductToStock(state, action) {
      state.data = [...state.data, action.payload.data];
    },
    filterStockData(state, action) {
      let tempStockData = [...state.data];
      tempStockData = tempStockData.filter(
        (data) =>
          data.productName.includes(action.payload.searchValue) &&
          data.totalNumberOfUnits > 0
      );
      state.filteredStockData = tempStockData;
    },
    updateStockProductsFromBill(state, action) {
      action.payload.updatedStockProducts.forEach((billProduct: StockDoc) => {
        //prettier-ignore
        const stockProductIndex = state.data.findIndex((stockProduct: StockDoc) => stockProduct.productName === billProduct.productName);
        if (stockProductIndex >= 0) {
          state.data[stockProductIndex] = billProduct;
        }
      });
      state.totalProductsBudget = state.data.reduce((acc, cur) => {
        return (
          acc + (cur.totalNumberOfUnits / cur.numberOfUnits) * cur.priceOfPiece
        );
      }, 0);
      state.totalProductsProfit = state.data.reduce((acc, cur) => {
        return acc + cur.totalNumberOfUnits * cur.priceOfUnit;
      }, 0);
    },
    updateStockProduct(state, action) {
      const updatedProductIndex = state.data.findIndex(
        (stockProduct: StockDoc) => stockProduct.id === action.payload.data.id
      );
      state.data[updatedProductIndex] = action.payload.data;
      state.totalProductsBudget = state.data.reduce((acc, cur) => {
        return (
          acc + (cur.totalNumberOfUnits / cur.numberOfUnits) * cur.priceOfPiece
        );
      }, 0);
      state.totalProductsProfit = state.data.reduce((acc, cur) => {
        return acc + cur.totalNumberOfUnits * cur.priceOfUnit;
      }, 0);
    },
    deleteStockProduct(state, action) {
      state.data = state.data.filter(
        (stockProduct: StockDoc) =>
          stockProduct.productName !== action.payload.data.productName
      );
      state.totalProductsBudget = state.data.reduce((acc, cur) => {
        return (
          acc + (cur.totalNumberOfUnits / cur.numberOfUnits) * cur.priceOfPiece
        );
      }, 0);
      state.totalProductsProfit = state.data.reduce((acc, cur) => {
        return acc + cur.totalNumberOfUnits * cur.priceOfUnit;
      }, 0);
    },
  },
});

export const stockActions = stockSlice.actions;

const isProductInStock = (productIndex: number) => productIndex >= 0;

export const addPurchaseBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];

    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;
      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );

      if (isProductInStock(stockProductInBillIndex)) {
        updatedProduct = { ...stockData[stockProductInBillIndex] };
        dispatch(addPurchaseBillOfExistingProduct(updatedProduct, billProduct));
      } else {
        dispatch(addPurchaseBillOfNotExistingProduct(billData, billProduct));
      }
    });
  };

export const addPurchaseBillOfExistingProduct =
  (updatedProduct: StockDoc, billProductInStock: StockDoc) =>
  async (dispatch: AppDispatch, getState: any) => {
    const missingProductsData = [...getState().missingProducts.data];

    const missingProduct: MissingProductsDoc = {
      productName: updatedProduct.productName,
      createdAt: new Date().toString(),
      category: updatedProduct.category,
      priceOfPiece: updatedProduct.priceOfPiece,
    };

    updatedProduct.numberOfUnits = billProductInStock.numberOfUnits;
    updatedProduct.priceOfPiece = billProductInStock.priceOfPiece;
    updatedProduct.priceOfUnit = billProductInStock.priceOfUnit;
    //prettier-ignore
    updatedProduct.totalNumberOfUnits += Math.abs(billProductInStock.totalProductAmount! * billProductInStock.numberOfUnits);

    const isMissingProductFound = missingProductsData.findIndex(
      (product: MissingProductsDoc) =>
        product.productName === missingProduct.productName
    );

    if (isMissingProductFound >= 0) {
      dispatch(deleteMissingProduct(missingProduct))
        .then((_) =>
          dispatch(
            snackbarActions.showSnackBar({
              type: SnackbarType.WARNING,
              message: SnackbarWarning.DELETE_MISSING,
            })
          )
        )
        .catch((_) =>
          dispatch(
            snackbarActions.showSnackBar({
              type: SnackbarType.ERROR,
              message: SnackbarFailed.DELETE_MISSING,
            })
          )
        );
    }
    // UPDATE STOCK WHEN THE PRODUCT IS FOUND
    //prettier-ignore
    updatedProduct.remainingAmountOfPieces = Math.trunc(updatedProduct.totalNumberOfUnits / updatedProduct.numberOfUnits);
    //prettier-ignore
    updatedProduct.remainingAmountOfUnits = updatedProduct.totalNumberOfUnits % updatedProduct.numberOfUnits;

    let profitOfUnitEquation, totalProfitEquation, profitPercentEquation;
    //prettier-ignore
    const {numberOfUnits, priceOfUnit, priceOfPiece, totalNumberOfUnits} = updatedProduct;
    //prettier-ignore
    const profit = (numberOfUnits * priceOfUnit) - priceOfPiece;
    profitOfUnitEquation = profit / numberOfUnits;
    //prettier-ignore
    totalProfitEquation = (profit / priceOfPiece) * ((totalNumberOfUnits / numberOfUnits) * priceOfPiece);
    //prettier-ignore
    profitPercentEquation = (profit / priceOfPiece) * 100;

    updatedProduct.profitOfPiece = profit;
    updatedProduct.profitOfUnit = +profitOfUnitEquation.toFixed(2);
    updatedProduct.totalProfit = totalProfitEquation;
    updatedProduct.profitPercent = profitPercentEquation;

    updateData({
      collectionName: COLLECTIONS.STOCK,
      docId: updatedProduct.id,
      newData: updatedProduct,
    });
  };

export const addPurchaseBillOfNotExistingProduct =
  (billData: BillsDoc, billProduct: any) => async (dispatch: AppDispatch) => {
    const { numberOfUnits, totalProductAmount } = billProduct;
    //

    let newProduct: StockDoc = {
      ...billProduct,
      numberOfPieces: totalProductAmount,
      purchasingCosts: billData.total,
      remainingAmountOfPieces: totalProductAmount,
      remainingAmountOfUnits: 0,
      totalNumberOfUnits: totalProductAmount * numberOfUnits,
      totalProductAmount: 1,
    };

    newProduct = calculateProfits(newProduct);
    // ADD TO STOCK
    sendData({
      collectionName: COLLECTIONS.STOCK,
      data: newProduct,
    }).then((data) =>
      dispatch(
        stockActions.addProductToStock({ data: { id: data.id, ...newProduct } })
      )
    );
  };

export const updatePurchaseBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];

    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;
      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );
      updatedProduct = { ...stockData[stockProductInBillIndex] };
      if (!!billProduct.oldProductAmount) {
        const { priceOfPiece, priceOfUnit, numberOfUnits } = billProduct;

        let profitOfUnitEquation, totalProfitEquation, profitPercentEquation;
        //
        const newProduct: StockDoc = {
          ...updatedProduct,
        };

        //prettier-ignore
        if((billProduct.totalProductAmount*billProduct.numberOfUnits) > billProduct.oldProductAmount) {
          newProduct.numberOfPieces += billProduct.totalProductAmount;
          //prettier-ignore
          newProduct.totalNumberOfUnits = Math.abs((updatedProduct.totalNumberOfUnits - billProduct.oldProductAmount) + (billProduct.totalProductAmount * billProduct.numberOfUnits));
        }

        //prettier-ignore
        if((billProduct.totalProductAmount*billProduct.numberOfUnits) < billProduct.oldProductAmount) {
          newProduct.numberOfPieces -= billProduct.totalProductAmount;
          //prettier-ignore
          newProduct.totalNumberOfUnits = Math.abs((updatedProduct.totalNumberOfUnits - billProduct.oldProductAmount) + (billProduct.totalProductAmount * billProduct.numberOfUnits));
        }

        if (billProduct.category !== updatedProduct.category) {
          newProduct.category = billProduct.category;
        }

        //prettier-ignore
        if(billProduct.priceOfPiece !== updatedProduct.priceOfPiece) {
            newProduct.priceOfPiece = billProduct.priceOfPiece;
          }
        //prettier-ignore
        if(billProduct.numberOfUnits !== updatedProduct.numberOfUnits) {
            newProduct.numberOfUnits = billProduct.numberOfUnits;
          }
        //prettier-ignore
        if(billProduct.priceOfUnit !== updatedProduct.priceOfUnit) {
            newProduct.priceOfUnit = billProduct.priceOfUnit;
          }
        //prettier-ignore
        newProduct.remainingAmountOfPieces = Math.abs(newProduct.totalNumberOfUnits / newProduct.numberOfUnits);
        //prettier-ignore
        newProduct.remainingAmountOfUnits = Math.abs(newProduct.totalNumberOfUnits % newProduct.numberOfUnits);

        //prettier-ignore
        const profit = (numberOfUnits * priceOfUnit) - priceOfPiece;
        profitOfUnitEquation = profit / numberOfUnits;
        //prettier-ignore
        totalProfitEquation = (profit / priceOfPiece) * ((newProduct.totalNumberOfUnits / newProduct.numberOfUnits) * priceOfPiece);
        //prettier-ignore
        profitPercentEquation = (profit / priceOfPiece) * 100;

        newProduct.profitOfPiece = profit;
        newProduct.profitOfUnit = +profitOfUnitEquation.toFixed(2);
        newProduct.totalProfit = totalProfitEquation;
        newProduct.profitPercent = profitPercentEquation;

        updatedProduct = newProduct;
      }

      updateData({
        collectionName: COLLECTIONS.STOCK,
        docId: updatedProduct.id,
        newData: updatedProduct,
      });
    });
  };

export const deletePurchaseBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];

    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;

      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );

      updatedProduct = { ...stockData[stockProductInBillIndex] };

      const isProductFreshInStock =
        billProduct.totalProductAmount * billProduct.numberOfUnits ===
        updatedProduct.totalNumberOfUnits;

      if (isProductFreshInStock) {
        dispatch(
          stockActions.deleteStockProduct({ data: updatedProduct.productName })
        );
        deleteData({
          collectionName: COLLECTIONS.STOCK,
          docId: updatedProduct.id!,
        });
      } else {
        updatedProduct.totalNumberOfUnits -= Math.abs(
          billProduct.totalProductAmount * billProduct.numberOfUnits
        );
        //prettier-ignore
        updatedProduct.remainingAmountOfPieces = Math.trunc(updatedProduct.totalNumberOfUnits / updatedProduct.numberOfUnits);
        //prettier-ignore
        updatedProduct.remainingAmountOfUnits = updatedProduct.totalNumberOfUnits % updatedProduct.numberOfUnits;

        updatedProduct = calculateProfits(updatedProduct);

        // UPDATE STOCK WHEN THE PRODUCT IS FOUND
        updateData({
          collectionName: COLLECTIONS.STOCK,
          docId: updatedProduct.id,
          newData: updatedProduct,
        });
      }
    });
  };

export const addNormalBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];
    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;

      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );

      updatedProduct = { ...stockData[stockProductInBillIndex] };

      const missingProduct: MissingProductsDoc = {
        productName: updatedProduct.productName,
        createdAt: new Date().toString(),
        category: updatedProduct.category,
        priceOfPiece: updatedProduct.priceOfPiece,
      };

      updatedProduct.totalNumberOfUnits -= Math.abs(
        billProduct.totalProductAmount
      );

      if (updatedProduct.totalNumberOfUnits <= 0) {
        dispatch(insertMissingProduct(missingProduct))
          .then((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.WARNING,
                message: SnackbarWarning.ADD_MISSING,
              })
            )
          )
          .catch((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.ERROR,
                message: SnackbarFailed.ADD_MISSING,
              })
            )
          );
      }

      //prettier-ignore
      updatedProduct.remainingAmountOfPieces = Math.trunc(updatedProduct.totalNumberOfUnits / updatedProduct.numberOfUnits);
      //prettier-ignore
      updatedProduct.remainingAmountOfUnits = updatedProduct.totalNumberOfUnits % updatedProduct.numberOfUnits;

      updatedProduct = calculateProfits(updatedProduct);

      // UPDATE STOCK WHEN THE PRODUCT IS FOUND
      updateData({
        collectionName: COLLECTIONS.STOCK,
        docId: updatedProduct.id,
        newData: updatedProduct,
      });
    });
  };

export const updateNormalBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];
    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;

      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );

      updatedProduct = { ...stockData[stockProductInBillIndex] };

      const missingProduct: MissingProductsDoc = {
        productName: updatedProduct.productName,
        createdAt: new Date().toString(),
        category: updatedProduct.category,
        priceOfPiece: updatedProduct.priceOfPiece,
      };

      if (!!billProduct.oldProductAmount) {
        //prettier-ignore
        if (billProduct.totalProductAmount > billProduct.oldProductAmount) {
          //prettier-ignore
          updatedProduct.totalNumberOfUnits -= Math.abs(billProduct.initialProductAmount);
          if (updatedProduct.totalNumberOfUnits <= 0) {
            //prettier-ignore
            dispatch(insertMissingProduct(missingProduct)).then((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.WARNING,
                message: SnackbarWarning.ADD_MISSING,
              })
            )
          )
          .catch((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.ERROR,
                message: SnackbarFailed.ADD_MISSING,
              })
            )
          );;
          }
        } else {
          //prettier-ignore
          updatedProduct.totalNumberOfUnits += Math.abs(billProduct.initialProductAmount);      
          if (billProduct.totalProductAmount < billProduct.totalNumberOfUnits) {
            //prettier-ignore
            dispatch(deleteMissingProduct(missingProduct)).then((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.WARNING,
                message: SnackbarWarning.DELETE_MISSING,
              })
            )
          )
          .catch((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.ERROR,
                message: SnackbarFailed.DELETE_MISSING,
              })
            )
          );
          }
        }
      }

      //prettier-ignore
      updatedProduct.remainingAmountOfPieces = Math.trunc(updatedProduct.totalNumberOfUnits / updatedProduct.numberOfUnits);
      //prettier-ignore
      updatedProduct.remainingAmountOfUnits = updatedProduct.totalNumberOfUnits % updatedProduct.numberOfUnits;

      updatedProduct = calculateProfits(updatedProduct);

      // UPDATE STOCK WHEN THE PRODUCT IS FOUND
      updateData({
        collectionName: COLLECTIONS.STOCK,
        docId: updatedProduct.id,
        newData: updatedProduct,
      });
    });
  };

export const deleteNormalBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];
    const missingProductsData = [...getState().missingProducts.data];

    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;

      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );

      updatedProduct = { ...stockData[stockProductInBillIndex] };

      const missingProduct: MissingProductsDoc = {
        productName: updatedProduct.productName,
        createdAt: new Date().toString(),
        category: updatedProduct.category,
        priceOfPiece: updatedProduct.priceOfPiece,
      };

      updatedProduct.totalNumberOfUnits += Math.abs(
        billProduct.totalProductAmount
      );

      const isMissingProductFound = missingProductsData.findIndex(
        (product: MissingProductsDoc) =>
          product.productName === missingProduct.productName
      );

      if (isMissingProductFound >= 0) {
        dispatch(deleteMissingProduct(missingProduct))
          .then((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.WARNING,
                message: SnackbarWarning.DELETE_MISSING,
              })
            )
          )
          .catch((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.ERROR,
                message: SnackbarFailed.DELETE_MISSING,
              })
            )
          );
      }

      //prettier-ignore
      updatedProduct.remainingAmountOfPieces = Math.trunc(updatedProduct.totalNumberOfUnits / updatedProduct.numberOfUnits);
      //prettier-ignore
      updatedProduct.remainingAmountOfUnits = updatedProduct.totalNumberOfUnits % updatedProduct.numberOfUnits;

      updatedProduct = calculateProfits(updatedProduct);
      // UPDATE STOCK WHEN THE PRODUCT IS FOUND
      updateData({
        collectionName: COLLECTIONS.STOCK,
        docId: updatedProduct.id,
        newData: updatedProduct,
      });
    });
  };

export const addReturnedBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];

    const missingProductsData = [...getState().missingProducts.data];
    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;

      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );

      updatedProduct = { ...stockData[stockProductInBillIndex] };

      const missingProduct: MissingProductsDoc = {
        productName: updatedProduct.productName,
        createdAt: new Date().toString(),
        category: updatedProduct.category,
        priceOfPiece: updatedProduct.priceOfPiece,
      };

      updatedProduct.totalNumberOfUnits += Math.abs(
        billProduct.totalProductAmount
      );

      const isMissingProductFound = missingProductsData.findIndex(
        (product: MissingProductsDoc) =>
          product.productName === missingProduct.productName
      );

      if (isMissingProductFound >= 0) {
        dispatch(deleteMissingProduct(missingProduct))
          .then((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.WARNING,
                message: SnackbarWarning.DELETE_MISSING,
              })
            )
          )
          .catch((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.ERROR,
                message: SnackbarFailed.DELETE_MISSING,
              })
            )
          );
      }

      //prettier-ignore
      updatedProduct.remainingAmountOfPieces = Math.trunc(updatedProduct.totalNumberOfUnits / updatedProduct.numberOfUnits);
      //prettier-ignore
      updatedProduct.remainingAmountOfUnits = updatedProduct.totalNumberOfUnits % updatedProduct.numberOfUnits;

      updatedProduct = calculateProfits(updatedProduct);
      // UPDATE STOCK WHEN THE PRODUCT IS FOUND
      updateData({
        collectionName: COLLECTIONS.STOCK,
        docId: updatedProduct.id,
        newData: updatedProduct,
      });
    });
  };

export const updateReturnedBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];
    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;

      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );

      updatedProduct = { ...stockData[stockProductInBillIndex] };

      const missingProduct: MissingProductsDoc = {
        productName: updatedProduct.productName,
        createdAt: new Date().toString(),
        category: updatedProduct.category,
        priceOfPiece: updatedProduct.priceOfPiece,
      };

      if (!!billProduct.oldProductAmount) {
        //prettier-ignore
        if (billProduct.totalProductAmount > billProduct.oldProductAmount) {
          //prettier-ignore
          updatedProduct.totalNumberOfUnits += Math.abs(billProduct.initialProductAmount);
          if (billProduct.totalProductAmount < billProduct.totalNumberOfUnits) {
            //prettier-ignore
            dispatch(deleteMissingProduct(missingProduct)).then((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.WARNING,
                message: SnackbarWarning.DELETE_MISSING,
              })
            )
          )
          .catch((_) =>
            dispatch(
              snackbarActions.showSnackBar({
                type: SnackbarType.ERROR,
                message: SnackbarFailed.DELETE_MISSING,
              })
            )
          );
          }
        } else {
          //prettier-ignore    
          updatedProduct.totalNumberOfUnits -= Math.abs(billProduct.initialProductAmount);      
          if (updatedProduct.totalNumberOfUnits <= 0) { 
            //prettier-ignore
            dispatch(insertMissingProduct(missingProduct));
          }
        }
      }

      //prettier-ignore
      updatedProduct.remainingAmountOfPieces = Math.trunc(updatedProduct.totalNumberOfUnits / updatedProduct.numberOfUnits);
      //prettier-ignore
      updatedProduct.remainingAmountOfUnits = updatedProduct.totalNumberOfUnits % updatedProduct.numberOfUnits;

      updatedProduct = calculateProfits(updatedProduct);
      // UPDATE STOCK WHEN THE PRODUCT IS FOUND
      updateData({
        collectionName: COLLECTIONS.STOCK,
        docId: updatedProduct.id,
        newData: updatedProduct,
      });
    });
  };

export const deleteReturnedBill =
  (billData: BillsDoc) => async (dispatch: AppDispatch, getState: any) => {
    const stockData = [...getState().stock.data];
    billData.products.forEach((billProduct: any) => {
      let updatedProduct: StockDoc = {} as StockDoc;

      const stockProductInBillIndex = stockData.findIndex(
        (stockProduct: StockDoc) =>
          stockProduct.productName === billProduct.productName
      );

      updatedProduct = { ...stockData[stockProductInBillIndex] };

      const missingProduct: MissingProductsDoc = {
        productName: updatedProduct.productName,
        createdAt: new Date().toString(),
        category: updatedProduct.category,
        priceOfPiece: updatedProduct.priceOfPiece,
      };

      updatedProduct.totalNumberOfUnits -= Math.abs(
        billProduct.totalProductAmount
      );
      if (updatedProduct.totalNumberOfUnits <= 0) {
        //prettier-ignore
        dispatch(insertMissingProduct(missingProduct));
      }

      //prettier-ignore
      updatedProduct.remainingAmountOfPieces = Math.trunc(updatedProduct.totalNumberOfUnits / updatedProduct.numberOfUnits);
      //prettier-ignore
      updatedProduct.remainingAmountOfUnits = updatedProduct.totalNumberOfUnits % updatedProduct.numberOfUnits;

      updatedProduct = calculateProfits(updatedProduct);

      // UPDATE STOCK WHEN THE PRODUCT IS FOUND
      updateData({
        collectionName: COLLECTIONS.STOCK,
        docId: updatedProduct.id,
        newData: updatedProduct,
      });
    });
  };

export const addStockDataToStore = () => async (dispatch: AppDispatch) => {
  dispatch(stockActions.fetchingStockData({}));
  try {
    const stockData = await readData(COLLECTIONS.STOCK);
    dispatch(stockActions.addStockData({ data: stockData }));
  } catch (err) {
    dispatch(stockActions.errorStockData({}));
  }
};

export const updateStockDataToStore =
  (stockProduct: StockDoc) => async (dispatch: AppDispatch) => {
    try {
      await updateData({
        collectionName: COLLECTIONS.STOCK,
        docId: stockProduct.id,
        newData: stockProduct,
      }).then((_) => {
        dispatch(stockActions.updateStockProduct({ data: stockProduct }));
      });
    } catch (err) {
      console.error(err);
    }
  };

export const deleteStockDataFromStore =
  (stockProduct: StockDoc) => async (dispatch: AppDispatch) => {
    try {
      await deleteData({
        collectionName: COLLECTIONS.STOCK,
        docId: stockProduct.id,
      } as DeleteRequestData).then((_) => {
        dispatch(stockActions.deleteStockProduct({ data: stockProduct }));
      });
    } catch (err) {
      console.error(err);
    }
  };

export default stockSlice.reducer;
