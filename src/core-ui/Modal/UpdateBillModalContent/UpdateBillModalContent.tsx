import React, { useState } from "react";
import Switch from "../../Switch/Switch";
import { FaEdit } from "react-icons/fa";
import classes from "./UpdateBillModalContent.module.scss";
import UpdateNewProductToBill from "./UpdateNewProductToBill/UpdateNewProductToBill";
import { BillsDoc } from "../../../interfaces";
import { BillType } from "../../../types/bills";
import useProduct from "../../../hooks/use-product";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { updateBill } from "../../../store/bills/bill-slice";
import {
  updateNormalBill,
  updateReturnedBill,
} from "../../../store/stock/stock-slice";
import { formatFullDate } from "../../../helpers/functions";
import { snackbarActions } from "../../../store/snackbar/snackbar-slice";
import {
  SnackbarFailed,
  SnackbarSuccess,
  SnackbarType,
} from "../../../constants";

const UpdateBillModalContent: React.FC<{
  data: BillsDoc;
  hideUpdateModal: Function;
  updatedBillData: any;
  dispatchBillActions: Function;
}> = (props) => {
  const billDataType = props.data.type === BillType.NORMAL_BILL;

  const [billType, setBillType] = useState<boolean>(billDataType);

  const dispatch = useAppDispatch();

  const { productFormArray: billProducts } = useProduct();

  function changeBillType<T>(event: React.FormEvent<T>) {
    setBillType((prevState) => !prevState);
  }

  const submitBillFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const billData: BillsDoc = {
      id: props.data.id,
      total: props.updatedBillData.billTotal,
      createdAt: props.data.createdAt,
      products: [...props.updatedBillData.billSelectedProducts],
      type: billType ? BillType.NORMAL_BILL : BillType.RETURNED_BILL,
      updatedAt: new Date().toString(),
    };

    // UPDATE STOCK IN DATABASE

    if (billData.type === BillType.NORMAL_BILL) {
      dispatch(updateNormalBill(billData))
        .then((_) =>
          dispatch(
            snackbarActions.showSnackBar({
              type: SnackbarType.SUCCESS,
              message: SnackbarSuccess.UPDATE_NORMAL_BILL,
            })
          )
        )
        .catch((err) =>
          dispatch(
            snackbarActions.showSnackBar({
              type: SnackbarType.ERROR,
              message: SnackbarFailed.UPDATE_NORMAL_BILL,
            })
          )
        );
    } else if (billData.type === BillType.RETURNED_BILL) {
      dispatch(updateReturnedBill(billData))
        .then((_) =>
          dispatch(
            snackbarActions.showSnackBar({
              type: SnackbarType.SUCCESS,
              message: SnackbarSuccess.UPDATE_RETURNED_BILL,
            })
          )
        )
        .catch((err) =>
          dispatch(
            snackbarActions.showSnackBar({
              type: SnackbarType.ERROR,
              message: SnackbarFailed.UPDATE_RETURNED_BILL,
            })
          )
        );
    }

    // UPDATE BILL IN DATABASE
    dispatch(updateBill(billData)).then((_) => {
      props.hideUpdateModal();
    });
  };

  return (
    <div className={classes["add-bill-modal"]}>
      <div className={classes["add-bill-modal__header"]}>
        <h2 className={classes["add-bill-modal__header--date"]}>
          تعديل فاتوره شراء بتاريخ - {formatFullDate(props.data.createdAt)}
        </h2>
        <div className="separator separator--soft"></div>
      </div>
      <div className={classes["add-bill-modal__body"]}>
        {/** ADD BILL FORM */}
        <form
          className={classes["add-bill-form"]}
          onSubmit={submitBillFormHandler}
        >
          <div className="form-control">
            <h4 className="form-title">نوع الفاتوره</h4>
            <div className={classes["add-bill-form__type"]}>
              {billType ? (
                <label htmlFor="bill-type" className="form-label">
                  فاتوره عاديه:{" "}
                </label>
              ) : (
                <label htmlFor="bill-type" className="form-label">
                  فاتوره مرتجع:{" "}
                </label>
              )}
              <div className={classes["add-bill-form__type--wrapper"]}>
                <input
                  type="checkbox"
                  id="bill-type"
                  name="bill-product-type"
                  onChange={changeBillType}
                  className={classes["add-bill-form__checkbox"]}
                />
                <Switch billType={billType} changeBillType={changeBillType} />
              </div>
            </div>
          </div>
          <div className="form-control mt-md">
            <h4 className="form-title">بيانات المنتج</h4>

            {/** PRODUCTS */}
            <div className={classes["add-bill-form__products"]}>
              {/** PRODUCT *************************** */}
              {billProducts.map((productIndex) => {
                return (
                  <UpdateNewProductToBill
                    key={productIndex}
                    dispatchBillActions={props.dispatchBillActions}
                    billData={props.data}
                    billFallbackData={props.updatedBillData}
                  />
                );
              })}
            </div>
            {/** PRODUCT *************************** */}
          </div>
          {/** PRODUCTS */}
          <div className={classes["add-bill-form__actions"]}>
            <div className={classes["add-bill-form__actions--ctas"]}>
              <button type="submit" className="btn btn--primary btn--add">
                <span className={`fix-icon`}>
                  <FaEdit />
                </span>
                تعديل فاتوره
              </button>
            </div>
            <ul className={classes["add-bill-form__actions--info"]}>
              <li className={classes["add-bill-form__actions--info-item"]}>
                <span className="label">عدد المنتجات</span>
                <span className="value">{props.data.products.length}</span>
              </li>
              <li className={classes["add-bill-form__actions--info-item"]}>
                <span className="label">المجموع</span>
                <span className="value">{props.updatedBillData.billTotal}</span>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBillModalContent;
