import React from "react";
import { Link } from "react-router-dom";
import { formatFullDate, formatNumber } from "../../../helpers/functions";
import classes from "./IncomeTableItem.module.scss";

const IncomeTableItem: React.FC<{
  id: string;
  income: number;
  date: string;
}> = (props) => {
  return (
    <Link to={`/report/${props.id}`} className={classes["income-table-item"]}>
      <span className={classes["income-table-item--value"]}>
        {formatNumber(props.income)}
      </span>
      <span className={classes["income-table-item--date"]}>
        {formatFullDate(props.date)}
      </span>
    </Link>
  );
};

export default IncomeTableItem;
