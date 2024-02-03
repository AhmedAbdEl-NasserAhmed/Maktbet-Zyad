import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { OutlaysDoc } from "../../../interfaces";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import classes from "../AddBillModalContent/AddBillModalContent.module.scss";
import outlayClasses from "./AddNewOutlay.module.scss";
import { insertOutlay } from "../../../store/outlays/outlays-slice";
import { snackbarActions } from "../../../store/snackbar/snackbar-slice";
import {
  SnackbarFailed,
  SnackbarSuccess,
  SnackbarType,
} from "../../../constants";

const AddOutlayModalContent: React.FC<{ hideAddOutlayModal: Function }> = (
  props
) => {
  const dispatch = useAppDispatch();

  const [outlayTitle, setOutlayTitle] = useState<string>("");
  const [outlayAmount, setOutlayAmount] = useState<number>(0);

  const onChangeOutlayTitle = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setOutlayTitle(target.value);
  };
  const onChangeOutlayAmount = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setOutlayAmount(+target.value);
  };

  const submitBillFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const outlayData: OutlaysDoc = {
      title: outlayTitle,
      amount: outlayAmount,
      createdAt: new Date().toString(),
    };

    // INSERT OUTLAY TO DATABASE
    dispatch(insertOutlay(outlayData))
      .then((_) => {
        props.hideAddOutlayModal();
      })
      .then((_) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.SUCCESS,
            message: SnackbarSuccess.ADD_OUTLAY,
          })
        )
      )
      .catch((err) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.ERROR,
            message: SnackbarFailed.ADD_OUTLAY,
          })
        )
      );
  };

  return (
    <div className={classes["add-bill-modal"]}>
      <div className={classes["add-bill-modal__header"]}>
        <h2 className={classes["add-bill-modal__header--date"]}>
          أضافة المصاريف الخارجيه
        </h2>
        <div className="separator separator--soft"></div>
      </div>
      <div className={classes["add-bill-modal__body"]}>
        {/** ADD BILL FORM */}
        <form
          className={classes["add-bill-form"]}
          onSubmit={submitBillFormHandler}
        >
          <div className="form-control mt-md">
            <h4 className="form-title">المصاريف</h4>

            {/** PRODUCTS */}
            <div className={outlayClasses["add-bill-form__products"]}>
              {/** PRODUCT *************************** */}
              <div className={outlayClasses["add-bill-product"]}>
                {/** PRODUCT NAME */}
                <div className={`${outlayClasses["add-bill-product__info"]}`}>
                  <label className="form-label">العنوان</label>
                  <input
                    type="text"
                    className={outlayClasses["add-bill-product__info--input"]}
                    value={outlayTitle}
                    onChange={onChangeOutlayTitle}
                    required
                  />
                </div>

                {/** PRODUCT AMOUNT */}
                <div className={outlayClasses["add-bill-product__info"]}>
                  <label className="form-label">القيمه</label>
                  <input
                    type="number"
                    className={outlayClasses["add-bill-product__info--input"]}
                    min={1}
                    step={"0.1"}
                    value={outlayAmount}
                    onChange={onChangeOutlayAmount}
                    required
                  />
                </div>
              </div>
            </div>
            {/** PRODUCT *************************** */}
          </div>
          {/** PRODUCTS */}
          <div className={classes["add-bill-form__actions"]}>
            <div className={classes["add-bill-form__actions--ctas"]}>
              <button type="submit" className="btn btn--primary btn--add">
                <span className={`fix-icon`}>
                  <FaPlus />
                </span>
                أضف
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOutlayModalContent;
