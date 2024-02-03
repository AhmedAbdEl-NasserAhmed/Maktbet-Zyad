import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { updateStockDataToStore } from "../../../store/stock/stock-slice";
import classes from "./UpdateStockModalContent.module.scss";
import stockProductClasses from "./UpdatedStockProduct/UpdatedStockProduct.module.scss";
import { snackbarActions } from "../../../store/snackbar/snackbar-slice";
import {
  SnackbarFailed,
  SnackbarSuccess,
  SnackbarType,
} from "../../../constants";

const UpdateStockModalContent: React.FC<{
  data: any;
  hideModal: Function;
}> = (props) => {
  const dispatch = useAppDispatch();

  const { productName, category, priceOfUnit } = props.data;

  //prettier-ignore
  const [stockProductName, setStockProductName] = useState<string>(productName);
  const [productCategory, setProductCategory] = useState<string>(category);
  const [productUnitPrice, setProductUnitPrice] = useState<number>(priceOfUnit);

  const onChangeProductName = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setStockProductName(target.value);
  };
  const onChangeProductCategory = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    const target = event.target as HTMLInputElement;
    setProductCategory(target.value);
  };
  const onChangeUnitPrice = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setProductUnitPrice(+target.value);
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // VALIDATION /////

    const newStockProduct = {
      ...props.data,
      productName: stockProductName,
      category: productCategory,
      priceOfUnit: productUnitPrice,
    };

    dispatch(updateStockDataToStore(newStockProduct))
      .then((_) => props.hideModal())
      .then((_) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.SUCCESS,
            message: SnackbarSuccess.UPDATE_PRODUCT,
          })
        )
      )
      .catch((err) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.ERROR,
            message: SnackbarFailed.UPDATE_PRODUCT,
          })
        )
      );
  };

  return (
    <div className={classes["add-bill-modal"]}>
      <div className={classes["add-bill-modal__header"]}>
        <h2 className={classes["add-bill-modal__header--date"]}>تعديل منتج</h2>
        <div className="separator separator--soft"></div>
      </div>
      <div className={classes["add-bill-modal__body"]}>
        {/** ADD BILL FORM */}
        <form className={classes["add-bill-form"]} onSubmit={submitFormHandler}>
          <div className="form-control mt-md">
            <h4 className="form-title">بيانات المنتج</h4>

            {/** PRODUCTS */}
            <div className={classes["add-bill-form__products"]}>
              {/** PRODUCT *************************** */}
              <div
                className={stockProductClasses["add-bill-product"]}
                // key={product.productName}
              >
                {/** PRODUCT NAME */}
                <div
                  className={`${stockProductClasses["add-bill-product__info"]} ${stockProductClasses["add-bill-product__info--product-name"]}`}
                >
                  <label className="form-label">اسم المنتج</label>
                  <input
                    type="text"
                    value={stockProductName}
                    onChange={onChangeProductName}
                    className={
                      stockProductClasses["add-bill-product__info--input"]
                    }
                  />
                </div>
                {/** PRODUCT CATEGORY */}
                <div className={stockProductClasses["add-bill-product__info"]}>
                  <label className="form-label">نوع المنتج</label>
                  <select
                    defaultValue={productCategory}
                    onChange={onChangeProductCategory}
                    className={
                      stockProductClasses["add-bill-product__info--input"]
                    }
                  >
                    <option>كراس</option>
                    <option>قلم</option>
                    <option>برايه</option>
                  </select>
                </div>
                {/** PRODUCT UNIT PRICE */}
                <div className={stockProductClasses["add-bill-product__info"]}>
                  <label className="form-label">ثمن الوحده</label>
                  <input
                    type="number"
                    min={1}
                    value={productUnitPrice}
                    onChange={onChangeUnitPrice}
                    className={
                      stockProductClasses["add-bill-product__info--input"]
                    }
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
                تعديل منتج
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModalContent;
