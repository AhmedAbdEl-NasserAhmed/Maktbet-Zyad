import React, { Fragment } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import SmartSearch from "../../../SmartSearch/SmartSearch";
import classes from "./AddNewProductToPurchaseBill.module.scss";
import usePurchaseBill from "../../../../hooks/use-purchase-bill";
import { useAppSelector } from "../../../../hooks/use-app-selector";

const AddNewProductToPurchaseBill: React.FC<{
  productIndex: number;
  removeNewBillProduct: Function;
  firstProductInBill: number;
  dispatchBillActions: Function;
}> = (props) => {
  const { dispatchBillActions, removeNewBillProduct } = props;

  const { data: stockData } = useAppSelector((state) => state.stock);

  const {
    billProductsConfig,
    getSearchValue,
    onChangeProductNameHandler,
    onChangeProductCategoryHandler,
    onChangeProductAmountHandler,
    onChangePiecePriceHandler,
    onChangeNumberOfUnitsHandler,
    onChangePriceOfUnit,
    removeProductFromBill,
  } = usePurchaseBill(dispatchBillActions, removeNewBillProduct);

  return (
    <Fragment>
      {/** PRODUCT *************************** */}
      <div className={classes["add-bill-product"]}>
        {/** PRODUCT NAME */}
        <div
          className={`${classes["add-bill-product__info"]} ${classes["add-bill-product__info--product-name"]}`}
        >
          <label
            htmlFor={`bill-product-name-${props.productIndex}`}
            className="form-label"
          >
            اسم المنتج
          </label>
          <SmartSearch
            getSearchValue={getSearchValue}
            onChangeProductNameHandler={onChangeProductNameHandler}
            filteredStockData={stockData}
            productIndex={props.productIndex}
          />
        </div>
        {/** PRODUCT CATEGORY */}
        <div className={classes["add-bill-product__info"]}>
          <label className="form-label">نوع المنتج</label>
          {(billProductsConfig.searchedProduct.id ||
            !!billProductsConfig.searchedProductName) && (
            // <select
            //   required
            //   defaultValue={""}
            //   onChange={onChangeProductCategoryHandler.bind(
            //     null,
            //     billProductsConfig.searchedProduct
            //   )}
            // >
            //   <option></option>
            //   <option>كراس</option>
            //   <option>قلم</option>
            //   <option>برايه</option>
            // </select>
            <input
              type="text"
              required
              onChange={onChangeProductCategoryHandler.bind(
                null,
                billProductsConfig.searchedProduct
              )}
            />
          )}
        </div>
        {/** PRODUCT PIECES AMOUNT */}
        <div className={classes["add-bill-product__info"]}>
          <label className="form-label">عدد القطع</label>
          {(billProductsConfig.searchedProduct.id ||
            !!billProductsConfig.searchedProductName) && (
            <input
              required
              type="number"
              value={billProductsConfig.searchedProductAmount}
              onChange={onChangeProductAmountHandler.bind(
                null,
                billProductsConfig.searchedProduct
              )}
            />
          )}
        </div>
        {/** PRODUCT PIECE PRICE */}
        <div className={classes["add-bill-product__info"]}>
          <label className="form-label">ثمن القطعه(جمله)</label>
          {(billProductsConfig.searchedProduct.id ||
            !!billProductsConfig.searchedProductName) && (
            <input
              required
              type="number"
              step={"0.1"}
              id={`bill-product-amount-${props.productIndex}`}
              min={1}
              onChange={onChangePiecePriceHandler.bind(
                null,
                billProductsConfig.searchedProduct
              )}
            />
          )}
        </div>
        {/** PRODUCT UNITS AMOUNT */}
        <div className={classes["add-bill-product__info"]}>
          <label className="form-label">عدد الوحده في القطعه</label>
          {(billProductsConfig.searchedProduct.id ||
            !!billProductsConfig.searchedProductName) && (
            <input
              required
              type="number"
              id={`bill-product-amount-${props.productIndex}`}
              onChange={onChangeNumberOfUnitsHandler.bind(
                null,
                billProductsConfig.searchedProduct
              )}
              min={1}
            />
          )}
        </div>
        {/** PRODUCT UNIT PRICE */}
        <div className={classes["add-bill-product__info"]}>
          <label className="form-label">ثمن الوحده</label>
          {(billProductsConfig.searchedProduct.id ||
            !!billProductsConfig.searchedProductName) && (
            <input
              type="number"
              step={"0.1"}
              id={`bill-product-amount-${props.productIndex}`}
              min={1}
              onChange={onChangePriceOfUnit.bind(
                null,
                billProductsConfig.searchedProduct
              )}
            />
          )}
        </div>

        {/** PRODUCT REMOVE */}
        <div className={classes["add-bill-product__info"]}>
          {props.productIndex !== props.firstProductInBill && (
            <button
              type="button"
              className={classes["add-bill-product__info--remove"]}
              onClick={removeProductFromBill.bind(
                null,
                billProductsConfig.searchedProduct
              )}
            >
              <RiCloseCircleFill />
            </button>
          )}
        </div>
      </div>
      {/** PRODUCT *************************** */}
    </Fragment>
  );
};

export default AddNewProductToPurchaseBill;
