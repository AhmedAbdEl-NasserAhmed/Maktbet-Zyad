import React, { Fragment, MouseEvent } from "react";

import { DBTables, SnackbarSuccess, SnackbarType } from "../../../../constants";
import { BillsDoc, PurchasesDoc } from "../../../../interfaces";
import { useAppDispatch } from "../../../../hooks/use-app-dispatch";
import { deleteBill } from "../../../../store/bills/bill-slice";
import {
  deleteNormalBill,
  deletePurchaseBill,
  deleteReturnedBill,
} from "../../../../store/stock/stock-slice";
import { BillType } from "../../../../types/bills";
import classes from "./InfoTableItem.module.scss";
import { formatDateByHours, formatNumber } from "../../../../helpers/functions";
import { deletePurchaseBillFromStore } from "../../../../store/purchases/purchases-slice";
import { snackbarActions } from "../../../../store/snackbar/snackbar-slice";

const InfoTableItem: React.FC<{
  tableId?: string;
  admin?: boolean;
  data: BillsDoc & PurchasesDoc;
  triggerModalAction: (data: any, event: React.MouseEvent) => void;
  triggerUpdateModalAction: (data: any) => void;
  hideModal: (event: React.MouseEvent) => void;
  dispatchUpdateBill: (updateData: any) => void;
}> = (props) => {
  const dispatch = useAppDispatch();

  const onDeleteBasicBill = (
    bill: BillsDoc,
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    // UPDATE STOCK IN DATABASE
    //prettier-ignore

    if(bill.type === BillType.NORMAL_BILL) {
      dispatch(deleteNormalBill(bill)).then((_) =>
      dispatch(
        snackbarActions.showSnackBar({
          type: SnackbarType.SUCCESS,
          message: SnackbarSuccess.DELETE_NORMAL_BILL,
        })
      )
    )
    .catch((_) =>
      dispatch(
        snackbarActions.showSnackBar({
          type: SnackbarType.ERROR,
          message: SnackbarSuccess.DELETE_NORMAL_BILL,
        })
      )
    );;
    } else {
      dispatch(deleteReturnedBill(bill)).then((_) =>
      dispatch(
        snackbarActions.showSnackBar({
          type: SnackbarType.SUCCESS,
          message: SnackbarSuccess.DELETE_RETURNED_BILL,
        })
      )
    )
    .catch((_) =>
      dispatch(
        snackbarActions.showSnackBar({
          type: SnackbarType.ERROR,
          message: SnackbarSuccess.DELETE_RETURNED_BILL,
        })
      )
    );;
    }

    dispatch(deleteBill(bill));
  };
  const onDeletePurchaseBill = (
    bill: BillsDoc,
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    // UPDATE STOCK IN DATABASE
    //prettier-ignore
    dispatch(deletePurchaseBill(bill));

    dispatch(deletePurchaseBillFromStore(bill))
      .then((_) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.SUCCESS,
            message: SnackbarSuccess.DELETE_PURCHASE_BILL,
          })
        )
      )
      .catch((_) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.ERROR,
            message: SnackbarSuccess.DELETE_PURCHASE_BILL,
          })
        )
      );
  };

  const onDeleteBill =
    props.data.type !== BillType.PURCHASES_BILL
      ? onDeleteBasicBill
      : onDeletePurchaseBill;

  const billTypeClasses =
    props.data.type === BillType.NORMAL_BILL
      ? `${classes[`info-table-item__bill-type--normal`]}`
      : props.data.type === BillType.RETURNED_BILL
      ? `${classes[`info-table-item__bill-type--returned`]}`
      : null;

  return (
    <div className={classes["info-table-item"]}>
      <div className={classes["info-table-item__bill-info"]}>
        <ul className={classes["info-table-item__products-list"]}>
          {props.tableId === DBTables.PURCHASES_TABLE && (
            <h3 className={classes["info-table-item__merchant-name"]}>
              {props.data.merchantName}
            </h3>
          )}
          {props.tableId === DBTables.BILLS_TABLE && (
            <h3
              className={`${classes["info-table-item__bill-type"]} ${billTypeClasses}`}
            >
              {props.data.type}
            </h3>
          )}
          {props.tableId === DBTables.PURCHASES_TABLE &&
            props.data.products.map((product: any) => {
              return (
                <Fragment key={product.productName}>
                  <li className={classes["info-table-item__products-item"]}>
                    <span
                      className={
                        classes["info-table-item__products-item--count"]
                      }
                    >
                      {product.totalProductAmount}
                    </span>
                    <span
                      className={
                        classes["info-table-item__products-item--category"]
                      }
                    >
                      {product.category}
                    </span>
                  </li>
                </Fragment>
              );
            })}
          {props.tableId === DBTables.BILLS_TABLE &&
            props.data.type === BillType.NORMAL_BILL &&
            props.data.products.map((product: any) => {
              return (
                <Fragment key={product.id}>
                  {product.totalProductAmount ? (
                    <li className={classes["info-table-item__products-item"]}>
                      <span
                        className={
                          classes["info-table-item__products-item--count"]
                        }
                      >
                        {formatNumber(product.totalProductAmount, "d")}
                      </span>
                      <span
                        className={
                          classes["info-table-item__products-item--category"]
                        }
                      >
                        {product.category}
                      </span>
                    </li>
                  ) : null}
                </Fragment>
              );
            })}

          {props.tableId === DBTables.BILLS_TABLE &&
            props.data.type === BillType.RETURNED_BILL &&
            props.data.products.map((product: any) => {
              return (
                <Fragment key={product.id}>
                  {product.totalProductAmount ? (
                    <li className={classes["info-table-item__products-item"]}>
                      <span
                        className={
                          classes["info-table-item__products-item--count"]
                        }
                      >
                        {formatNumber(product.totalProductAmount, "d")}
                      </span>
                      <span
                        className={
                          classes["info-table-item__products-item--category"]
                        }
                      >
                        {product.category}
                      </span>
                    </li>
                  ) : null}
                </Fragment>
              );
            })}

          <div className={classes["info-table-item__bill-price"]}>
            {formatNumber(props.data.total)}
          </div>
          <p className={classes["info-table-item__bill-date"]}>
            {formatDateByHours(props.data.createdAt)}
          </p>
        </ul>
      </div>
      <div className={classes["info-table-item__controls"]}>
        <ul className={classes["info-table-item__controls-list"]}>
          <li
            className={classes["info-table-item__controls-control"]}
            onClick={props.triggerModalAction.bind(null, props.data)}
          >
            فحص
          </li>
          {props.admin && (
            <Fragment>
              <li
                className={classes["info-table-item__controls-control"]}
                onClick={() => {
                  props.triggerUpdateModalAction(props.data);
                  props.dispatchUpdateBill(props.data);
                }}
              >
                تعديل
              </li>
              <li
                className={classes["info-table-item__controls-control"]}
                onClick={onDeleteBill.bind(null, props.data)}
              >
                مسح
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InfoTableItem;
