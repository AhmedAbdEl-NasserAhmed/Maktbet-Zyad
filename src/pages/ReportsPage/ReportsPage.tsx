import moment from "moment";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { COLLECTIONS, DBTables } from "../../constants";
import LoadingSpinner from "../../core-ui/LoadingSpinner/LoadingSpinner";
import FullInfoTable from "../../core-ui/Table/FullInfoTable/FullInfoTable";
import InfoTable from "../../core-ui/Table/InfoTable/InfoTable";
import Wrapper from "../../core-ui/Wrapper/Wrapper";
import {
  missingProductsTableHeadData,
  outlaysTableHeadData,
} from "../../helpers";
import { formatNumber } from "../../helpers/functions";
import useHttp from "../../hooks/use-http";
import { getDocByID } from "../../services/api";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import classes from "./ReportsPage.module.scss";

const ReportsPage: React.FC = () => {
  const { id: reportId } = useParams();
  const { data: report, sendHttpRequest } = useHttp(getDocByID);

  useEffect(() => {
    sendHttpRequest({ collectionName: COLLECTIONS.REPORTS, docId: reportId! });
  }, [sendHttpRequest, reportId]);
  return (
    <div className={classes.report}>
      <div className={classes["report__link"]}>
        <Link to="/stock">
          عودة الي المتجر {<BsFillArrowLeftCircleFill className="fix-icon" />}
        </Link>
      </div>
      {report.id ? (
        <Wrapper>
          <header className={classes["report__header"]}>
            <h1 className={classes["report__header--main"]}>
              تقرير عن يوم - {moment(new Date()).format("LLLL")}
            </h1>
            {/* {moment(new Date()).format("LTS")} */}
            <div className={classes["report__header--wrapper"]}>
              <h3 className={`${classes["report__header--income"]} mt-sm`}>
                <span className="label">مجموع الفواتير</span>
                <span className="value">{formatNumber(report.income)}</span>
              </h3>
              <h3 className={`${classes["report__header--income"]} mt-sm`}>
                <span className="label">الخوارج</span>
                <span className="value">{formatNumber(report.expenses)}</span>
              </h3>
              <h3 className={`${classes["report__header--income"]} mt-sm`}>
                <span className="label">الإيراد</span>
                <span className="value">
                  {formatNumber(report.income - report.expenses)}
                </span>
              </h3>
            </div>
          </header>
          <hr className="separator separator--soft" />
          <div className={classes["report__section"]}>
            <header className={`${classes["report__header"]} mb-sm`}>
              <h3 className={`${classes["report__header--main"]}`}>
                <span className="label">الفواتير: </span>
                <span className="value">{report.bills.length}</span>
              </h3>
            </header>
            {/** BILLS TABLE */}
            {report.bills.length > 0 ? (
              <InfoTable
                tableId={DBTables.BILLS_TABLE}
                title="الفواتير"
                data={report.bills}
              />
            ) : (
              <h2 className="not-founded">لا يوجد فواتير</h2>
            )}
          </div>
          <hr className="separator separator--soft" />
          <div className={classes["report__section"]}>
            <header className={`${classes["report__header"]} mb-sm`}>
              <h3 className={`${classes["report__header--main"]} mt-sm`}>
                <span className="label">الخوارج: </span>
                <span className="value">{report.outlays.length}</span>
              </h3>
            </header>
            {/** PURCHASE BILLS TABLE */}
            {report.outlays.length > 0 ? (
              <FullInfoTable
                tableId={DBTables.OUTLAYS_TABLE}
                headData={outlaysTableHeadData}
                data={report.outlays}
                className="mt-md"
              />
            ) : (
              <h2 className="not-founded">لا يوجد فواتير شراء</h2>
            )}
          </div>
          <hr className="separator separator--soft" />
          <div className={classes["report__section"]}>
            <header className={`${classes["report__header"]} mb-sm`}>
              <h3 className={`${classes["report__header--main"]} mt-sm`}>
                <span className="label">فواتير الشراء: </span>
                <span className="value">{report.purchases.length}</span>
              </h3>
            </header>
            {/** PURCHASE BILLS TABLE */}
            {report.purchases.length > 0 ? (
              <InfoTable
                tableId={DBTables.PURCHASES_TABLE}
                title="فواتير الشراء"
                data={report.purchases}
              />
            ) : (
              <h2 className="not-founded">لا يوجد فواتير شراء</h2>
            )}
          </div>
          <hr className="separator separator--soft" />
          <div className={classes["report__section"]}>
            <header className={`${classes["report__header"]} mb-sm`}>
              <h3 className={`${classes["report__header--main"]} mt-sm`}>
                <span className="label">المنقوصات: </span>
                <span className="value">{report.missingProducts.length}</span>
              </h3>
            </header>
            {/** PURCHASE BILLS TABLE */}
            {report.missingProducts.length > 0 ? (
              <FullInfoTable
                tableId={DBTables.MISSING_PRODUCTS_TABLE}
                headData={missingProductsTableHeadData}
                data={report.missingProducts}
                className="mt-md"
              />
            ) : (
              <h2 className="not-founded">لا يوجد منقوصات</h2>
            )}
          </div>
          <hr className="separator separator--soft" />
        </Wrapper>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ReportsPage;
