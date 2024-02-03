import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { OutlaysDoc } from "../../../interfaces";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import classes from "../AddBillModalContent/AddBillModalContent.module.scss";
import outlayClasses from "../AddOutlayModalContent/AddNewOutlay.module.scss";
import { updateOutlayAction } from "../../../store/outlays/outlays-slice";
import { snackbarActions } from "../../../store/snackbar/snackbar-slice";
import {
  SnackbarFailed,
  SnackbarSuccess,
  SnackbarType,
} from "../../../constants";

const UpdateOutlayModalContent: React.FC<{
  hideUpdateOutlayModal: Function;
  data: any;
}> = (props) => {
  const dispatch = useAppDispatch();

  const [outlayTitle, setOutlayTitle] = useState<string>(props.data.title);
  const [outlayAmount, setOutlayAmount] = useState<number>(props.data.amount);

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
      id: props.data.id,
      title: outlayTitle,
      amount: outlayAmount,
      createdAt: props.data.createdAt,
      updatedAt: new Date().toString(),
    };

    // INSERT OUTLAY TO DATABASE
    dispatch(updateOutlayAction(outlayData))
      .then((_) => {
        props.hideUpdateOutlayModal();
      })
      .then((_) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.SUCCESS,
            message: SnackbarSuccess.UPDATE_OUTLAY,
          })
        )
      )
      .catch((err) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.ERROR,
            message: SnackbarFailed.UPDATE_OUTLAY,
          })
        )
      );
  };

  return (
    <div className={classes["add-bill-modal"]}>
      <div className={classes["add-bill-modal__header"]}>
        <h2 className={classes["add-bill-modal__header--date"]}>
          تعديل المصاريف الخارجيه
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
                  />
                </div>

                {/** PRODUCT AMOUNT */}
                <div className={outlayClasses["add-bill-product__info"]}>
                  <label className="form-label">القيمه</label>
                  <input
                    type="number"
                    className={outlayClasses["add-bill-product__info--input"]}
                    min={1}
                    value={outlayAmount}
                    onChange={onChangeOutlayAmount}
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
                  <FaEdit />
                </span>
                تعديل
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOutlayModalContent;
