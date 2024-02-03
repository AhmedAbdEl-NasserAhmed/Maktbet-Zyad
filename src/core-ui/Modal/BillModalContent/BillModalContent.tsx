import { Fragment } from "react";
import { DBTables } from "../../../constants";
import { billsTableHeadData, purchasesTableHeadData } from "../../../helpers";
import { formatFullDate, formatNumber } from "../../../helpers/functions";
import { BillsDoc, PurchasesDoc } from "../../../interfaces";
import { BillType } from "../../../types/bills";
import FullInfoTable from "../../Table/FullInfoTable/FullInfoTable";
import classes from "./BillModalContent.module.scss";

const BillModalContent: React.FC<{
  billId?: DBTables;
  data: BillsDoc & PurchasesDoc;
  fullData: BillsDoc[];
}> = (props) => {
  const billTypeClasses =
    props.data.type === BillType.NORMAL_BILL
      ? `${classes[`bill-modal__body--type-normal`]}`
      : props.data.type === BillType.RETURNED_BILL
      ? `${classes[`bill-modal__body--type-returned`]}`
      : null;

  return (
    <div className={classes["bill-modal"]}>
      <div className={classes["bill-modal__header"]}>
        {props.billId === DBTables.BILLS_TABLE && (
          <h2 className={classes["bill-modal__header--date"]}>
            فحص فاتورة بتاريخ - {formatFullDate(props.data.createdAt)}
          </h2>
        )}
        {props.billId === DBTables.PURCHASES_TABLE && (
          <h2 className={classes["bill-modal__header--date"]}>
            فحص فاتورة شراء بتاريخ - {formatFullDate(props.data.createdAt)}
          </h2>
        )}
        <div className="separator separator--soft"></div>
      </div>
      <div className={classes["bill-modal__body"]}>
        <h3 className={classes["bill-modal__body--title"]}>محتوي الفاتوره</h3>

        <div className="responsive-y-table">
          {props.billId === DBTables.PURCHASES_TABLE && (
            <Fragment>
              <h5>{props.data.merchantName}</h5>
              <FullInfoTable
                tableId={props.billId}
                headData={purchasesTableHeadData}
                data={props.data.products}
                className="mt-md"
              />
            </Fragment>
          )}
          {props.billId === DBTables.BILLS_TABLE && (
            <Fragment>
              <h5 className={`${billTypeClasses}`}>
                <span className="label">نوع الفاتوره: </span>
                <span className="value">{props.data.type}</span>
              </h5>
              <FullInfoTable
                tableId={props.billId}
                headData={billsTableHeadData}
                data={props.data.products}
                className="mt-md"
              />
            </Fragment>
          )}
        </div>
      </div>

      <div className="separator separator--soft"></div>
      <div className={classes["bill-modal__footer"]}>
        <h4 className={classes["bill-modal__total"]}>
          <span className={classes["bill-modal__total--label"]}>المجموع</span>
          <span className={classes["bill-modal__total--value"]}>
            {formatNumber(props.data.total)}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default BillModalContent;
