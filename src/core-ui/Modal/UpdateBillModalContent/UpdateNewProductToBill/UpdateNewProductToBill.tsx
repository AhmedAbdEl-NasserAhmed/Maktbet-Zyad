import React, { Fragment } from "react";
import { CRUDRequest } from "../../../../constants";
import useUpdateBill from "../../../../hooks/use-update-bill";
import { BillsDoc } from "../../../../interfaces";
import classes from "./UpdateNewProductToBill.module.scss";

const UpdateNewProductToBill: React.FC<{
  dispatchBillActions: Function;
  billData: BillsDoc;
  CRUDRequest?: CRUDRequest;
  billFallbackData: any;
}> = (props) => {
  const { dispatchBillActions } = props;

  const { onChangeProductAmountHandler } = useUpdateBill(
    dispatchBillActions,
    props.billData
  );

  return (
    <Fragment>
      {props.billFallbackData.billSelectedProducts.map((product: any) => {
        //prettier-ignore
        const oldProduct = props.billData.products.find((oldProduct: any) => oldProduct.id === product.id)!;
        //prettier-ignore=

        return (
          <Fragment key={product.id}>
            {/** PRODUCT *************************** */}
            <div className={classes["update-bill-product"]}>
              {/** PRODUCT NAME */}
              <div
                className={`${classes["update-bill-product__info"]} ${classes["update-bill-product__info--product-name"]}`}
              >
                <label
                  htmlFor={`bill-product-name-${product.id}`}
                  className="form-label"
                >
                  اسم المنتج
                </label>
                <div
                  className={classes["update-bill-product__info--static-value"]}
                >
                  {product.productName}
                </div>
                {/* <SmartSearch getSearchValue={getSearchValue} /> */}
              </div>
              {/** PRODUCT PRICE */}
              <div className={classes["update-bill-product__info"]}>
                <label className="form-label">سعر المنتج</label>
                <span
                  className={classes["update-bill-product__info--static-value"]}
                >
                  {product.priceOfUnit}
                </span>
              </div>
              {/** PRODUCT OLD AMOUNT */}
              <div className={classes["update-bill-product__info"]}>
                <label className="form-label">الكميه القديمه</label>
                <span
                  className={classes["update-bill-product__info--static-value"]}
                >
                  {oldProduct.totalProductAmount}
                </span>
              </div>
              {/** PRODUCT NEW AMOUNT */}
              <div className={classes["update-bill-product__info"]}>
                <label
                  htmlFor={`bill-product-amount-${product.id}`}
                  className="form-label"
                >
                  الكميه الجديده
                </label>
                <input
                  type="number"
                  id={`bill-product-amount-${product.id}`}
                  className={classes["update-bill-product__info--input"]}
                  min={0}
                  max={product.totalNumberOfUnits}
                  // max={billProductInStock.totalNumberOfUnits}
                  step="0.01"
                  name="bill-product-amount"
                  value={product.updatedProductAmount}
                  onChange={onChangeProductAmountHandler.bind(null, oldProduct)}
                />
              </div>
            </div>
            {/** PRODUCT *************************** */}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default UpdateNewProductToBill;
