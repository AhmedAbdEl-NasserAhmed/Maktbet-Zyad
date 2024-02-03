import moment from "moment";
import React, { Fragment, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SnackBar from "./components/Snackbar/Snackbar";
import LoadingSpinner from "./core-ui/LoadingSpinner/LoadingSpinner";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import { useAppSelector } from "./hooks/use-app-selector";
import HomePage from "./pages/HomePage/HomePage";
import { addBillsData } from "./store/bills/bill-slice";
import { addMissingProductsDataToStore } from "./store/missing-products/missing-products-slice";
import { addOutlays } from "./store/outlays/outlays-slice";
import { addPurchasesDataToStore } from "./store/purchases/purchases-slice";
import { addReports } from "./store/reports/reports-slice";
import { addStockDataToStore } from "./store/stock/stock-slice";

const StockPage = React.lazy(() => import("./pages/StockPage/StockPage"));
const StorePage = React.lazy(() => import("./pages/StorePage/StorePage"));
//prettier-ignore
const PurchasesPage = React.lazy(() => import("./pages/PurchasesPage/PurchasesPage"));
const BillsPage = React.lazy(() => import("./pages/BillsPage/BillsPage"));
//prettier-ignore
const ReturnedBillsPage = React.lazy(() => import("./pages/ReturnedBills/ReturnedBills"));
//prettier-ignore
const MissingProductsPage = React.lazy(() => import("./pages/MissingProductsPage/MissingProductsPage"));
const ReportsPage = React.lazy(() => import("./pages/ReportsPage/ReportsPage"));

function App() {
  moment.locale("ar");
  const dispatch = useAppDispatch();

  const { type, message } = useAppSelector((state) => state.snackbar);

  useEffect(() => {
    dispatch(addBillsData());
    dispatch(addStockDataToStore());
    dispatch(addMissingProductsDataToStore());
    dispatch(addPurchasesDataToStore());
    dispatch(addOutlays());
    dispatch(addReports());
  }, [dispatch]);

  return (
    <Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <SnackBar type={type} message={message} />
        <Routes>
          <Route path="/stock" element={<StockPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/returned-bills" element={<ReturnedBillsPage />} />
          <Route path="/missing-products" element={<MissingProductsPage />} />
          <Route path="/report/:id" element={<ReportsPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<h1>404 Page</h1>} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
