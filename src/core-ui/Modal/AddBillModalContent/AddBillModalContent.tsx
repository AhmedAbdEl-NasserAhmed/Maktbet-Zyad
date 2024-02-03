import React, { useState } from "react";
import Switch from "../../Switch/Switch";
import { FaPlus } from "react-icons/fa";
import AddNewProductToBill from "./AddNewProductToBill/AddNewProductToBill";
import { BillsDoc } from "../../../interfaces";
import { BillType } from "../../../types/bills";
import useProduct from "../../../hooks/use-product";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { insertBill } from "../../../store/bills/bill-slice";
import useBillProductsController from "../../../hooks/use-bill-products-controller";
import {
  addNormalBill,
  addReturnedBill,
} from "../../../store/stock/stock-slice";
import classes from "./AddBillModalContent.module.scss";
import { snackbarActions } from "../../../store/snackbar/snackbar-slice";
import {
  SnackbarFailed,
  SnackbarSuccess,
  SnackbarType,
} from "../../../constants";

const AddBillModalContent: React.FC<{ hideAddBillModal: Function }> = (
  props
) => {
  const [billType, setBillType] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const { billProductsData, dispatchBillActions } = useBillProductsController();

  const {
    productFormArray: billProducts,
    addProductFormData: addNewBillProduct,
    removeProductFormData: removeNewBillProduct,
  } = useProduct();

  function changeBillType<T>(event: React.FormEvent<T>) {
    setBillType((prevState) => !prevState);
  }

  const submitBillFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const billData: BillsDoc = {
      total: billProductsData.billTotal,
      createdAt: new Date().toString(),
      products: [...billProductsData.billSelectedProducts],
      type: billType ? BillType.NORMAL_BILL : BillType.RETURNED_BILL,
    };

    // UPDATE STOCK IN DATABASE
    //prettier-ignore
    if(billData.type === BillType.NORMAL_BILL) {
      dispatch(addNormalBill(billData)).then((_) =>
      dispatch(
        snackbarActions.showSnackBar({
          type: SnackbarType.SUCCESS,
          message: SnackbarSuccess.ADD_NORMAL_BILL,
        })
      )
    ).catch((err) =>
    dispatch(
      snackbarActions.showSnackBar({
        type: SnackbarType.ERROR,
        message: SnackbarFailed.ADD_NORMAL_BILL,
      })
    )
  );
    } else if(billData.type === BillType.RETURNED_BILL) {
      dispatch(addReturnedBill(billData)).then((_) =>
      dispatch(
        snackbarActions.showSnackBar({
          type: SnackbarType.SUCCESS,
          message: SnackbarSuccess.ADD_RETURNED_BILL,
        })
      )
    ).catch((err) =>
    dispatch(
      snackbarActions.showSnackBar({
        type: SnackbarType.ERROR,
        message: SnackbarFailed.ADD_RETURNED_BILL,
      })
    )
  );
    }

    // INSERT BILL TO DATABASE
    dispatch(insertBill(billData)).then((_) => {
      props.hideAddBillModal();
    });
  };

  return (
    <div className={classes["add-bill-modal"]}>
      <div className={classes["add-bill-modal__header"]}>
        <h2 className={classes["add-bill-modal__header--date"]}>
          أضافة فاتوره
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
              {billProducts.map((productIndex, _, billProductsArray) => {
                return (
                  <AddNewProductToBill
                    key={productIndex}
                    productIndex={productIndex}
                    removeNewBillProduct={removeNewBillProduct.bind(
                      null,
                      productIndex
                    )}
                    firstProductInBill={billProductsArray[0]}
                    dispatchBillActions={dispatchBillActions}
                    billType={billType}
                  />
                );
              })}
            </div>
            {/** PRODUCT *************************** */}
          </div>
          {/** PRODUCTS */}
          <div className={classes["add-bill-form__actions"]}>
            <div className={classes["add-bill-form__actions--ctas"]}>
              <button
                type="button"
                className="btn btn--default btn--add"
                onClick={addNewBillProduct}
              >
                أضف منتج
              </button>
              <button type="submit" className="btn btn--primary btn--add">
                <span className={`fix-icon`}>
                  <FaPlus />
                </span>
                أضف فاتوره
              </button>
            </div>
            <ul className={classes["add-bill-form__actions--info"]}>
              <li className={classes["add-bill-form__actions--info-item"]}>
                <span className="label">عدد المنتجات</span>
                <span className="value">{billProducts.length}</span>
              </li>
              <li className={classes["add-bill-form__actions--info-item"]}>
                <span className="label">المجموع</span>
                <span className="value">{billProductsData.billTotal}</span>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBillModalContent;
