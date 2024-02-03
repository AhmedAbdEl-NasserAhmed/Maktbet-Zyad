import React, { Fragment } from "react";
import { DBTables } from "../../../constants";
import useReadData from "../../../hooks/use-read-data";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Modal from "../../Modal/Modal";
import UpdateStockModalContent from "../../Modal/UpdateStockModalContent/UpdateStockModalContent";
import BillsTableData from "./BillsTableData/BillsTableData";
import classes from "./FullInfoTable.module.scss";
import OutlaysTableData from "./OutlaysTableData/OutlaysTableData";
import MissingProductsTableData from "./MissingProductsTableData/MissingProductsTableData";
import PurchasesTableData from "./PurchasingTableData/PurchasesTableData";
import StockTableData from "./StockTableData/StockTableData";
import UpdateOutlayModalContent from "../../Modal/UpdateOutlayModalContent/UpdateOutlayModalContent";

const FullInfoTable: React.FC<{
  tableId?: DBTables;
  title?: string;
  data: any[];
  headData: string[];
  isLoading?: boolean;
  className?: string;
  admin?: boolean;
}> = (props) => {
  const {
    hideModal,
    readData,
    showModal,
    triggerModalAction: updateStockTrigger,
  } = useReadData();

  const {
    showModal: outsUpdateModal,
    triggerModalAction: triggerUpdateOutsModal,
    hideModal: hideUpdateOutsModal,
    readData: outlayUpdateData,
  } = useReadData();
  return (
    <Fragment>
      {showModal && (
        <Modal onHide={hideModal}>
          <UpdateStockModalContent data={readData} hideModal={hideModal} />
        </Modal>
      )}
      {outsUpdateModal && (
        <Modal onHide={hideUpdateOutsModal}>
          <UpdateOutlayModalContent
            data={outlayUpdateData}
            hideUpdateOutlayModal={hideUpdateOutsModal}
          />
        </Modal>
      )}
      {props.isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={`${props.className}`}>
          <table
            className={`${classes["stock-table"]} table ${
              props.tableId === DBTables.PURCHASES_TABLE
                ? "table-responsive"
                : null
            }`}
          >
            {props.title && <caption>{props.title}</caption>}
            <thead>
              <tr>
                {props.headData.map((headData) => (
                  <th key={headData}>{headData}</th>
                ))}
                {props.admin && (
                  <Fragment key={props.title}>
                    <th>Actions</th>
                  </Fragment>
                )}
              </tr>
            </thead>
            <tbody>
              {props.tableId === DBTables.STOCK_TABLE &&
                props.data.map((dataItem) => (
                  <StockTableData
                    key={dataItem.id}
                    dataItem={dataItem}
                    admin={props.admin}
                    updateStockTrigger={updateStockTrigger}
                  />
                ))}
              {props.tableId === DBTables.BILLS_TABLE &&
                props.data.map((product) => {
                  return (
                    <BillsTableData
                      key={product.id}
                      product={product}
                      admin={props.admin}
                    />
                  );
                })}
              {props.tableId === DBTables.PURCHASES_TABLE &&
                props.data.map((product) => (
                  <PurchasesTableData
                    key={product.productName}
                    product={product}
                    admin={props.admin}
                  />
                ))}
              {props.tableId === DBTables.MISSING_PRODUCTS_TABLE &&
                props.data.map((dataItem) => (
                  <MissingProductsTableData
                    key={dataItem.id}
                    dataItem={dataItem}
                    admin={props.admin}
                  />
                ))}
              {props.tableId === DBTables.OUTLAYS_TABLE &&
                props.data.map((dataItem) => {
                  return (
                    <OutlaysTableData
                      key={dataItem.id}
                      dataItem={dataItem}
                      admin={props.admin}
                      onUpdate={triggerUpdateOutsModal}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};

export default FullInfoTable;
