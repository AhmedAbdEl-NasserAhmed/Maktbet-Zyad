import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { StockDoc } from "../../interfaces";
import { stockActions } from "../../store/stock/stock-slice";
import classes from "./SmartSearch.module.scss";

const SmartSearch: React.FC<{
  getSearchValue: Function;
  onChangeProductNameHandler?: (inputProductName: string) => void;
  updateValue?: string;
  productIndex?: number;
  filteredStockData: StockDoc[];
}> = (props) => {
  //prettier-ignore
  const [searchValue, setSearchValue] = useState<string>(!!props.updateValue ? props.updateValue : '');

  const [showSmartSearch, setShowSmartSearch] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const search = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;

    setSearchValue(target.value);
    if (target.value === "") {
      setShowSmartSearch(false);
      return;
    }
    if (!!props.onChangeProductNameHandler) {
      props.onChangeProductNameHandler(target.value);
    }
    dispatch(stockActions.filterStockData({ searchValue }));
    setShowSmartSearch(true);
  };
  const selectSearchResult = (
    searchResult: StockDoc,
    event: React.MouseEvent<HTMLLIElement>
  ): void => {
    setSearchValue(searchResult.productName);
    setShowSmartSearch(false);

    props.getSearchValue(searchResult);

    dispatch(stockActions.filterStockData({ searchValue: "" }));
  };

  return (
    <div className={classes["smart-search"]}>
      <input
        type="search"
        placeholder="بحث"
        className={classes["smart-search__input"]}
        onChange={search}
        value={searchValue}
        onFocus={() => setShowSmartSearch(true)}
        onBlur={() => setTimeout(() => setShowSmartSearch(false), 100)}
        required
      />
      {showSmartSearch && (
        <ul className={classes["smart-search__result"]}>
          {props.filteredStockData.length > 0 ? (
            props.filteredStockData.map((product: StockDoc) => {
              return (
                <li
                  key={product.id}
                  className={classes["smart-search__result-item"]}
                  onClick={selectSearchResult.bind(null, product)}
                >
                  {product.productName}
                </li>
              );
            })
          ) : (
            <h6 className="not-founded">لا يوجد منتجات في المتجر</h6>
          )}
        </ul>
      )}
    </div>
  );
};

export default SmartSearch;
