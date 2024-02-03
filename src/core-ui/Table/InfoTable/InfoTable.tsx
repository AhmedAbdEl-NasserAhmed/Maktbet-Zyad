import React, { Fragment } from "react";
import { DBTables } from "../../../constants";
import useReadData from "../../../hooks/use-read-data";
import useUpdateBillController from "../../../hooks/use-update-bill-controller";
import useUpdatePurchaseBillController from "../../../hooks/use-update-purchase-bill-controller";
import { BillType } from "../../../types/bills";
import FilterByDate from "../../FilterByDate/FilterByDate";
import BillModalContent from "../../Modal/BillModalContent/BillModalContent";
import Modal from "../../Modal/Modal";
import UpdateBillModalContent from "../../Modal/UpdateBillModalContent/UpdateBillModalContent";
import UpdatePurchaseBillModalContent from "../../Modal/UpdatePurchaseBillModalContent/UpdatePurchaseBillModalContent";
import classes from "./InfoTable.module.scss";
import InfoTableItem from "./InfoTableItem/InfoTableItem";

const InfoTable: React.FC<{
  tableId?: DBTables;
  title?: string;
  data: any[];
  className?: string;
  admin?: boolean;
  onChangeDateHandler?: (e: React.FormEvent<HTMLInputElement>) => void;
  dateValue?: Date;
}> = (props) => {
  const { showModal, triggerModalAction, hideModal, readData } = useReadData();

  // NORMAL THINGS
  const {
    showModal: showUpdateBillModal,
    triggerModalAction: triggerUpdateBillModalAction,
    hideModal: hideUpdateBillModal,
    readData: updateBillData,
  } = useReadData();

  const { billProductsData, dispatchBillActions } = useUpdateBillController();

  const dispatchUpdateBill = (updateData: any) => {
    dispatchBillActions({
      type: "UPDATE_BILL",
      payload: { data: updateData },
    });
  };

  // PURCHASE THINGS
  const {
    showModal: showUpdatePurchaseBillModal,
    triggerModalAction: triggerUpdatePurchaseBillModalAction,
    hideModal: hideUpdatePurchaseBillModal,
    readData: updatePurchaseBillData,
  } = useReadData();

  const {
    billProductsData: purchaseBillProductsData,
    dispatchBillActions: dispatchPurchaseBillActions,
  } = useUpdatePurchaseBillController();

  const dispatchUpdatePurchaseBill = (updateData: any) => {
    dispatchPurchaseBillActions({
      type: "UPDATE_BILL",
      payload: { data: updateData },
    });
  };

  return (
    <Fragment>
      {showModal && (
        <Modal onHide={hideModal}>
          {readData && (
            <BillModalContent
              billId={props.tableId}
              data={readData}
              fullData={props.data}
            />
          )}
        </Modal>
      )}
      {showUpdateBillModal && (
        <Modal onHide={hideUpdateBillModal}>
          {updateBillData && (
            <UpdateBillModalContent
              data={updateBillData}
              hideUpdateModal={hideUpdateBillModal}
              updatedBillData={billProductsData}
              dispatchBillActions={dispatchBillActions}
            />
          )}
        </Modal>
      )}
      {showUpdatePurchaseBillModal && (
        <Modal onHide={hideUpdatePurchaseBillModal}>
          {updatePurchaseBillData && (
            <UpdatePurchaseBillModalContent
              data={updatePurchaseBillData}
              hideUpdatePurchaseModal={hideUpdatePurchaseBillModal}
              updatedPurchaseBillData={purchaseBillProductsData}
              dispatchPurchaseBillActions={dispatchPurchaseBillActions}
            />
          )}
        </Modal>
      )}
      <div className={`${classes["info-table"]} ${props.className}`}>
        <div className={classes["info-table__header"]}>
          {props.title && (
            <h3 className={classes["info-table__header--title"]}>
              {props.title}
            </h3>
          )}
          <FilterByDate
            onChangeDateHandler={props.onChangeDateHandler}
            dateValue={props.dateValue}
          />
        </div>
        {props.data.length > 0 ? (
          props.data.map((data) => {
            const isNormalBill = data.type !== BillType.PURCHASES_BILL;
            return (
              <InfoTableItem
                key={data.id}
                tableId={props.tableId}
                admin={props.admin}
                data={data}
                hideModal={hideModal}
                triggerModalAction={triggerModalAction}
                //prettier-ignore
                triggerUpdateModalAction={isNormalBill ? triggerUpdateBillModalAction : triggerUpdatePurchaseBillModalAction}
                //prettier-ignore
                dispatchUpdateBill={isNormalBill ? dispatchUpdateBill : dispatchUpdatePurchaseBill}
              />
            );
          })
        ) : (
          <h2 className="not-founded">لا يوجد فواتير</h2>
        )}
      </div>
    </Fragment>
  );
};

export default InfoTable;
