import { Fragment, useEffect } from "react";
import Navigation from "../../components/Layouts/Navigation/Navigation";
import Sidebar from "../../components/Layouts/Sidebar/Sidebar";
import FullInfoTable from "../../core-ui/Table/FullInfoTable/FullInfoTable";
import Wrapper from "../../core-ui/Wrapper/Wrapper";
import { DBTables } from "../../constants";
import { stockTableHeadData } from "../../helpers";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { addStockDataToStore } from "../../store/stock/stock-slice";
import classes from "../StockPage/StockPage.module.scss";

const StorePage: React.FC = () => {
  const { data: stockData, isLoading } = useAppSelector((state) => state.stock);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addStockDataToStore());
  }, [dispatch]);
  return (
    <Fragment>
      <div className={classes.page}>
        <Navigation title="البضاعه" />
        <Sidebar />
        <div className={classes["page__content"]}>
          <Wrapper>
            <FullInfoTable
              tableId={DBTables.STOCK_TABLE}
              title={DBTables.STOCK_TABLE}
              headData={stockTableHeadData}
              data={stockData}
              isLoading={isLoading}
              admin={true}
            />
          </Wrapper>
        </div>
      </div>
    </Fragment>
  );
};

export default StorePage;
