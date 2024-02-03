import React from "react";
import { SnackbarSuccess, SnackbarType } from "../../../../constants";
import { formatFullDate, formatNumber } from "../../../../helpers/functions";
import { useAppDispatch } from "../../../../hooks/use-app-dispatch";
import { OutlaysDoc } from "../../../../interfaces";
import { deleteOutlayAction } from "../../../../store/outlays/outlays-slice";
import { snackbarActions } from "../../../../store/snackbar/snackbar-slice";

const OutlaysTableData: React.FC<{
  dataItem: OutlaysDoc;
  admin?: boolean;
  onUpdate: (
    outlay: OutlaysDoc,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
}> = (props) => {
  const dispatch = useAppDispatch();

  const onUpdateOutlay = (
    outlay: OutlaysDoc,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    props.onUpdate(outlay);
  };

  const onDeleteOutlay = (
    outlay: OutlaysDoc,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(deleteOutlayAction(outlay))
      .then((_) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.SUCCESS,
            message: SnackbarSuccess.DELETE_OUTLAY,
          })
        )
      )
      .catch((_) =>
        dispatch(
          snackbarActions.showSnackBar({
            type: SnackbarType.ERROR,
            message: SnackbarSuccess.DELETE_OUTLAY,
          })
        )
      );
  };
  return (
    <tr key={props.dataItem.id}>
      <td>{props.dataItem.title}</td>
      <td>{formatNumber(props.dataItem.amount)}</td>
      <td>{formatFullDate(props.dataItem.createdAt)}</td>
      {props.admin && (
        <td className="table__actions">
          <button
            className="btn btn--warning ml-xs"
            onClick={onUpdateOutlay.bind(null, props.dataItem)}
          >
            تعديل
          </button>
          <button
            className="btn btn--danger"
            onClick={onDeleteOutlay.bind(null, props.dataItem)}
          >
            مسح
          </button>
        </td>
      )}
    </tr>
  );
};

export default OutlaysTableData;
