import React from "react";
import { formatNumber } from "../../../../helpers/functions";
import { StockDoc } from "../../../../interfaces";

const BillsTableData: React.FC<{ product: StockDoc; admin?: boolean }> = (
  props
) => {
  return (
    <tr key={props.product.id}>
      <td>{props.product.productName}</td>
      <td>{props.product.category}</td>
      <td>{formatNumber(props.product.priceOfUnit)}</td>
      <td>{formatNumber(props.product.totalProductAmount!, "d")}</td>
      {props.admin && (
        <td className="table__actions">
          <button className="btn btn--warning ml-xs">تعديل</button>
          <button className="btn btn--danger">مسح</button>
        </td>
      )}
    </tr>
  );
};

export default BillsTableData;
