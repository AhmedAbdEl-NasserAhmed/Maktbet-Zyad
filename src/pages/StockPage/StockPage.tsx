import DashboardDataCards from "../../components/DashboardCards/DashboardDataCards";
import LineChartComponent from "../../components/DashboardAnalysis/LineChart/LineChart";
import PieChartComponent from "../../components/DashboardAnalysis/PieChart/PieChart";
import IncomeTable from "../../components/IncomeTable/IncomeTable";
import Navigation from "../../components/Layouts/Navigation/Navigation";
import Sidebar from "../../components/Layouts/Sidebar/Sidebar";
import FullInfoTable from "../../core-ui/Table/FullInfoTable/FullInfoTable";
import InfoTable from "../../core-ui/Table/InfoTable/InfoTable";
import { useAppSelector } from "../../hooks/use-app-selector";
import { DBTables } from "../../constants";
import { missingProductsTableHeadData } from "../../helpers";
import classes from "./StockPage.module.scss";
import { BillType } from "../../types/bills";
import useDate from "../../hooks/use-date";
import { dateMe, resetDate } from "../../helpers/functions";

const StockPage = () => {
  const { data: missingProductsData, isLoading: missingProductsDataLoading } =
    useAppSelector((state) => state.missingProducts);
  const { data: purchasesData } = useAppSelector((state) => state.purchases);
  const { data: billsData } = useAppSelector((state) => state.bills);
  const { data: reportsData } = useAppSelector((state) => state.reports);

  const { dateValue, onChangeDateHandler } = useDate();
  const {
    dateValue: returnedBillDateValue,
    onChangeDateHandler: returnedBillsChangeDateHandler,
  } = useDate();
  const {
    dateValue: purchaseBillsDateValue,
    onChangeDateHandler: purchaseBillssChangeDateHandler,
  } = useDate();

  const normalBillsData = billsData
    .filter((billData) => billData.type === BillType.NORMAL_BILL)
    .filter(
      (billProduct) =>
        resetDate(dateMe(billProduct.createdAt)) === resetDate(dateValue)
    )
    .slice(0, 4);

  const returnedBillsData = billsData
    .filter((billData) => billData.type === BillType.RETURNED_BILL)
    .filter(
      (billProduct) =>
        resetDate(dateMe(billProduct.createdAt)) ===
        resetDate(returnedBillDateValue)
    )
    .slice(0, 4);

  const purchaseBillsData = purchasesData
    .filter(
      (billProduct) =>
        resetDate(dateMe(billProduct.createdAt)) ===
        resetDate(purchaseBillsDateValue)
    )
    .slice(0, 4);

  return (
    <div className={classes["page"]}>
      <Navigation title="المعلومات و الادارة" />
      <Sidebar />
      <div className={classes["page__content"]}>
        <div className={classes["page__data-cards-wrapper"]}>
          <DashboardDataCards />
        </div>
        <div className={classes["page__analysis-wrapper"]}>
          <div className={classes["page__analysis"]}>
            <LineChartComponent />
          </div>
          <div className={classes["page__analysis"]}>
            <PieChartComponent />
          </div>
        </div>
        {/** FAWATER TABLE */}
        <div className="grid-2x-container mb-xg mt-xg">
          <InfoTable
            tableId={DBTables.BILLS_TABLE}
            title="الفواتير"
            data={normalBillsData}
            onChangeDateHandler={onChangeDateHandler}
            dateValue={dateValue}
          />
          <InfoTable
            tableId={DBTables.BILLS_TABLE}
            title="المرتجع"
            data={returnedBillsData}
            onChangeDateHandler={returnedBillsChangeDateHandler}
            dateValue={returnedBillDateValue}
          />
        </div>
        {/** MOSHTRYAT TABLE */}
        {missingProductsData.length > 0 ? (
          <FullInfoTable
            tableId={DBTables.MISSING_PRODUCTS_TABLE}
            title={DBTables.MISSING_PRODUCTS_TABLE}
            headData={missingProductsTableHeadData}
            data={missingProductsData}
            isLoading={missingProductsDataLoading}
          />
        ) : (
          <h2 className="not-founded">لا يوجد منقوصات</h2>
        )}
        <div className="grid-3fr-container mt-xg mb-xg">
          {/** MANKOSAT TABLE */}
          <InfoTable
            tableId={DBTables.PURCHASES_TABLE}
            title="أخر المشتريات"
            data={purchaseBillsData}
            dateValue={purchaseBillsDateValue}
            onChangeDateHandler={purchaseBillssChangeDateHandler}
          />
          <IncomeTable data={reportsData} />
        </div>
      </div>
    </div>
  );
};

export default StockPage;
