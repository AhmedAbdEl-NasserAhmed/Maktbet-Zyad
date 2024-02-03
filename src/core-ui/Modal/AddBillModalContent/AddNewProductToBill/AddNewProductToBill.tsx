import React, { Fragment } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useAppSelector } from "../../../../hooks/use-app-selector";
import useBillProducts from "../../../../hooks/use-bill-products";
import SmartSearch from "../../../SmartSearch/SmartSearch";
import classes from "./AddNewProductToBill.module.scss";

const AddNewProductToBill: React.FC<{
  productIndex: number;
  removeNewBillProduct: Function;
  firstProductInBill: number;
  dispatchBillActions: Function;
  billType: boolean;
}> = (props) => {
  const { dispatchBillActions, removeNewBillProduct } = props;
  const { filteredStockData, data: stockData } = useAppSelector(
    (state) => state.stock
  );

  const {
    billProductsConfig,
    getSearchValue,
    onChangeProductAmountHandler,
    removeProductFromBill,
  } = useBillProducts(dispatchBillActions, removeNewBillProduct);

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
            filteredStockData={props.billType ? filteredStockData : stockData}
          />
        </div>
        {/** PRODUCT PRICE */}
        <div className={classes["add-bill-product__info"]}>
          <label className="form-label">سعر المنتج</label>
          {billProductsConfig.searchedProduct.id && (
            <span className={classes["add-bill-product__info--input"]}>
              {billProductsConfig.searchedProduct.priceOfUnit}
            </span>
          )}
        </div>

        {/** PRODUCT AMOUNT */}
        <div className={classes["add-bill-product__info"]}>
          <label
            htmlFor={`bill-product-amount-${props.productIndex}`}
            className="form-label"
          >
            الكميه
          </label>
          {billProductsConfig.searchedProduct.id && (
            <input
              required
              type="number"
              id={`bill-product-amount-${props.productIndex}`}
              className={classes["add-bill-product__info--input"]}
              min={1}
              max={billProductsConfig.searchedProduct.totalNumberOfUnits}
              name="bill-product-amount"
              value={billProductsConfig.searchedProductAmount}
              onChange={onChangeProductAmountHandler.bind(
                null,
                billProductsConfig.searchedProduct
              )}
            />
          )}
        </div>
        {/** PRODUCT TOTAL PRICE */}
        <div className={classes["add-bill-product__info"]}>
          <label htmlFor="bill-product-total" className="form-label">
            المجموع
          </label>
          {billProductsConfig.searchedProduct.id && (
            <span className={classes["add-bill-product__info--input"]}>
              {billProductsConfig.searchedProduct.priceOfUnit *
                billProductsConfig.searchedProductAmount}
            </span>
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

export default AddNewProductToBill;
