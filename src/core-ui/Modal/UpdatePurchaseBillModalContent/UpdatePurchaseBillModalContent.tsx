import React from "react";
import { FaEdit } from "react-icons/fa";
import { PurchasesDoc } from "../../../interfaces";
import { BillType } from "../../../types/bills";
import useProduct from "../../../hooks/use-product";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { updatePurchaseBillToStore } from "../../../store/purchases/purchases-slice";
import { updatePurchaseBill } from "../../../store/stock/stock-slice";
import UpdateNewProductToPurchaseBill from "./UpdateNewProductToPurchaseBill/UpdateNewProductToPurchaseBill";
import classes from "./UpdatePurchaseBillModalContent.module.scss";
import { snackbarActions } from "../../../store/snackbar/snackbar-slice";
import {
  SnackbarFailed,
  SnackbarSuccess,
  SnackbarType,
} from "../../../constants";

const UpdatePurchaseBillModalContent: React.FC<{
  data: any;
  hideUpdatePurchaseModal: Function;
  updatedPurchaseBillData: any;
  dispatchPurchaseBillActions: Function;
}> = (props) => {
  const dispatch = useAppDispatch();

  const { productFormArray: billProducts } = useProduct();

  // //prettier-ignore
  // const [ _, setBillDataConfig] = useState<any>();

  // //prettier-ignore
  // const getBillConfigData = useCallback((billConfigData: PurchaseBillConfigInitialState) => {
  //   setBillDataConfig(billConfigData)
  // }, [])

  const submitBillFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // BILL DATA
    const billData: PurchasesDoc = {
      id: props.data.id,
      merchantName: props.data.merchantName,
      total: props.updatedPurchaseBillData.billTotal,
      createdAt: new Date().toString(),
      products: [...props.updatedPurchaseBillData.billSelectedProducts],
      type: BillType.PURCHASES_BILL,
      updatedAt: new Date().toString(),
    };

    // UPDATE STOCK IN DATABASE
    //prettier-ignore
    dispatch(updatePurchaseBill(billData));

    // UPDATE BILL TO DATABASE
    dispatch(updatePurchaseBillToStore(billData))
      .then((_) => {
        props.hideUpdatePurchaseModal();
      })
      .then((_) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.SUCCESS,
            message: SnackbarSuccess.UPDATE_PURCHASE_BILL,
          })
        )
      )
      .catch((err) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.ERROR,
            message: SnackbarFailed.UPDATE_PURCHASE_BILL,
          })
        )
      );
  };

  return (
    <div className={classes["add-bill-modal"]}>
      <div className={classes["add-bill-modal__header"]}>
        <h2 className={classes["add-bill-modal__header--date"]}>
          تعديل فاتورة شراء
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
            <h4 className="form-title">أسم التاجر</h4>
            <div>
              <div>{props.data.merchantName}</div>
            </div>
          </div>
          <div className="form-control mt-md">
            <h4 className="form-title">بيانات الفاتوره</h4>

            {/** PRODUCTS */}
            <div className={classes["add-bill-form__products"]}>
              {/** PRODUCT *************************** */}
              {billProducts.map((productIndex) => {
                return (
                  <UpdateNewProductToPurchaseBill
                    key={productIndex}
                    dispatchPurchaseBillActions={
                      props.dispatchPurchaseBillActions
                    }
                    billData={props.data}
                    billFallbackData={props.updatedPurchaseBillData}
                    // getBillConfigData={getBillConfigData}
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
                تعديل فاتورة شراء
              </button>
            </div>
            <ul className={classes["add-bill-form__actions--info"]}>
              <li className={classes["add-bill-form__actions--info-item"]}>
                <span className={classes["add-bill-form__actions--info-label"]}>
                  عدد المنتجات
                </span>
                <span className={classes["add-bill-form__actions--info-value"]}>
                  {billProducts.length}
                </span>
              </li>
              <li className={classes["add-bill-form__actions--info-item"]}>
                <span className={classes["add-bill-form__actions--info-label"]}>
                  المجموع
                </span>
                <span className={classes["add-bill-form__actions--info-value"]}>
                  {props.updatedPurchaseBillData.billTotal}
                </span>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePurchaseBillModalContent;
