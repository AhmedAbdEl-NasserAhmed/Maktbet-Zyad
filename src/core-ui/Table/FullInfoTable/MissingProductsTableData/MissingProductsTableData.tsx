import React from "react";
import { formatFullDate, formatNumber } from "../../../../helpers/functions";
import { MissingProductsDoc } from "../../../../interfaces";

const MissingProductsTableData: React.FC<{
  dataItem: MissingProductsDoc;
  admin?: boolean;
}> = (props) => {
  return (
    <tr key={props.dataItem.id}>
      <td>{props.dataItem.productName}</td>
      <td>{props.dataItem.category}</td>
      <td>{formatNumber(props.dataItem.priceOfPiece)}</td>
      <td>{formatFullDate(props.dataItem.createdAt)}</td>
      {props.admin && (
        <td className="table__actions">
          <button className="btn btn--warning ml-xs">تعديل</button>
          <button className="btn btn--danger">مسح</button>
        </td>
      )}
    </tr>
  );
};

export default MissingProductsTableData;
