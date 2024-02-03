import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./bills/bill-slice";
import missingProductsReducer from "./missing-products/missing-products-slice";
import purchasesReducer from "./purchases/purchases-slice";
import StockReducer from "./stock/stock-slice";
import ReportReducer from "./reports/reports-slice";
import SnackbarReducer from "./snackbar/snackbar-slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import outlaysReducer from "./outlays/outlays-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const stockPersistReducer = persistReducer(persistConfig, StockReducer);

const store = configureStore({
  reducer: {
    stock: stockPersistReducer,
    missingProducts: missingProductsReducer,
    purchases: purchasesReducer,
    bills: billReducer,
    outlays: outlaysReducer,
    reports: ReportReducer,
    snackbar: SnackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
