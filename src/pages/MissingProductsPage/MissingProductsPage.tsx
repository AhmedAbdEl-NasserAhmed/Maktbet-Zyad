import { Fragment, useEffect } from "react";
import Navigation from "../../components/Layouts/Navigation/Navigation";
import Sidebar from "../../components/Layouts/Sidebar/Sidebar";
import FullInfoTable from "../../core-ui/Table/FullInfoTable/FullInfoTable";
import Wrapper from "../../core-ui/Wrapper/Wrapper";
import classes from "../StockPage/StockPage.module.scss";
import { DBTables } from "../../constants";
import { missingProductsTableHeadData } from "../../helpers";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { addMissingProductsDataToStore } from "../../store/missing-products/missing-products-slice";

const MissingProductsPage: React.FC = () => {
  const { data: missingProductsData, isLoading: missingProductsDataLoading } =
    useAppSelector((state) => state.missingProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addMissingProductsDataToStore());
  }, [dispatch]);

  return (
    <Fragment>
      <div className={classes.page}>
        <Navigation title="المنقوصات" />
        <Sidebar />
        <div className={classes["page__content"]}>
          <Wrapper>
            {/** MANKOSAT TABLE */}
            {missingProductsData.length > 0 ? (
              <FullInfoTable
                tableId={DBTables.MISSING_PRODUCTS_TABLE}
                title={DBTables.MISSING_PRODUCTS_TABLE}
                headData={missingProductsTableHeadData}
                data={missingProductsData}
                isLoading={missingProductsDataLoading}
                admin={true}
              />
            ) : (
              <h2 className="not-founded">لا يوجد منقوصات</h2>
            )}
          </Wrapper>
        </div>
      </div>
    </Fragment>
  );
};

export default MissingProductsPage;
