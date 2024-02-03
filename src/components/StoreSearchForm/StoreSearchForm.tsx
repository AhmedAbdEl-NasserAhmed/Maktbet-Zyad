import React from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { stockActions } from "../../store/stock/stock-slice";
import classes from "./StoreSearchForm.module.scss";

const StoreSearchForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    dispatch(stockActions.filterStockData({ searchValue: target.value }));
  };
  return (
    <form className={`${classes["store-form"]} mt-xg`}>
      <input
        type="search"
        className={classes["store-form__input"]}
        placeholder="بحث بأسم المنتج"
        onChange={onChangeHandler}
      />
    </form>
  );
};

export default StoreSearchForm;
