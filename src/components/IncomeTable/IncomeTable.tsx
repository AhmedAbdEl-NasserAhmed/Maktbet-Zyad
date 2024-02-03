import React from "react";
import IncomeTableItem from "./IncomeTableItem/IncomeTableItem";
import FilterByDate from "../../core-ui/FilterByDate/FilterByDate";
import classes from "./IncomeTable.module.scss";
import { ReportsDoc } from "../../interfaces";
import useDate from "../../hooks/use-date";
import { dateMe, resetDate } from "../../helpers/functions";

const IncomeTable: React.FC<{ data: ReportsDoc[] }> = (props) => {
  const { dateValue, onChangeDateHandler } = useDate();
  const filteredReports = props.data.filter(
    (bill) => resetDate(dateMe(bill.createdAt)) === resetDate(dateValue)
  );
  return (
    <div className={classes["income-table"]}>
      <div className={classes["income-table__intro"]}>
        <div className={classes["income-table__title"]}>التقارير</div>

        <FilterByDate
          dateValue={dateValue}
          onChangeDateHandler={onChangeDateHandler}
        />
      </div>
      <div className={classes["income-table__wrapper"]}>
        {filteredReports.length > 0 ? (
          filteredReports.map((report: ReportsDoc) => {
            return (
              <IncomeTableItem
                key={report.id!}
                id={report.id!}
                income={report.income}
                date={report.createdAt}
              />
            );
          })
        ) : (
          <h2 className="not-founded">لا يوجد تقارير لليوم</h2>
        )}
      </div>
    </div>
  );
};

export default IncomeTable;
