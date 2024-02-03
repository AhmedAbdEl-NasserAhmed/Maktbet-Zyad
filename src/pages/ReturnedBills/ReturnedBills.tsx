import { Fragment } from "react";
import Navigation from "../../components/Layouts/Navigation/Navigation";
import Sidebar from "../../components/Layouts/Sidebar/Sidebar";
import InfoTable from "../../core-ui/Table/InfoTable/InfoTable";
import Wrapper from "../../core-ui/Wrapper/Wrapper";
import { useAppSelector } from "../../hooks/use-app-selector";
import { DBTables } from "../../constants";
import classes from "../StockPage/StockPage.module.scss";
import { BillType } from "../../types/bills";
import { dateMe, resetDate } from "../../helpers/functions";
import useDate from "../../hooks/use-date";

const ReturnedBillsPage: React.FC = () => {
  const { data: billsData } = useAppSelector((state) => state.bills);

  const { dateValue, onChangeDateHandler } = useDate();
  const returnedBillsData = billsData
    .filter((billData) => billData.type === BillType.RETURNED_BILL)
    .filter(
      (billProduct) =>
        resetDate(dateMe(billProduct.createdAt)) === resetDate(dateValue)
    );
  return (
    <Fragment>
      <div className={classes.page}>
        <Navigation title="المرتجع" />
        <Sidebar />
        <div className={classes["page__content"]}>
          <Wrapper>
            <InfoTable
              tableId={DBTables.BILLS_TABLE}
              title="المرتجع"
              admin={true}
              data={returnedBillsData}
              dateValue={dateValue}
              onChangeDateHandler={onChangeDateHandler}
            />
          </Wrapper>
        </div>
      </div>
    </Fragment>
  );
};

export default ReturnedBillsPage;
