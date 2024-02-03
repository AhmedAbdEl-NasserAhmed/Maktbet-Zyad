import { Fragment } from "react";
import Navigation from "../../components/Layouts/Navigation/Navigation";
import Sidebar from "../../components/Layouts/Sidebar/Sidebar";
import Wrapper from "../../core-ui/Wrapper/Wrapper";
import classes from "../StockPage/StockPage.module.scss";
import { DBTables } from "../../constants";
import { useAppSelector } from "../../hooks/use-app-selector";
import Button from "../../core-ui/Button/Button";
import { FaPlus } from "react-icons/fa";
import useReadData from "../../hooks/use-read-data";
import Modal from "../../core-ui/Modal/Modal";
import AddPurchaseBillModalContent from "../../core-ui/Modal/AddPurchaseBillModalContent/AddPurchaseBillModalContent";
import InfoTable from "../../core-ui/Table/InfoTable/InfoTable";
import LoadingSpinner from "../../core-ui/LoadingSpinner/LoadingSpinner";
import useDate from "../../hooks/use-date";
import { BillType } from "../../types/bills";
import { dateMe, resetDate } from "../../helpers/functions";

const PurchasesPage: React.FC = () => {
  const { data: purchasesData, isLoading } = useAppSelector(
    (state) => state.purchases
  );

  const { showModal, hideModal, triggerModalAction } = useReadData();

  const { dateValue, onChangeDateHandler } = useDate();
  const purchaseBillsData = purchasesData
    .filter((billData) => billData.type === BillType.PURCHASES_BILL)
    .filter(
      (billProduct) =>
        resetDate(dateMe(billProduct.createdAt)) === resetDate(dateValue)
    );

  return (
    <Fragment>
      <div className={classes.page}>
        {showModal && (
          <Modal onHide={hideModal}>
            <AddPurchaseBillModalContent hideAddBillModal={hideModal} />
          </Modal>
        )}
        <Navigation title="المشتريات" />
        <Sidebar />
        <div className={classes["page__content"]}>
          <Wrapper>
            <Button
              className={"btn btn--primary btn--add mt-sm mb-md"}
              icon={<FaPlus />}
              text={"أضف فاتورة شراء"}
              onClick={triggerModalAction}
            />
            <Wrapper>
              {!isLoading ? (
                <InfoTable
                  tableId={DBTables.PURCHASES_TABLE}
                  title="فواتير الشراء"
                  admin={true}
                  data={purchaseBillsData}
                  dateValue={dateValue}
                  onChangeDateHandler={onChangeDateHandler}
                />
              ) : (
                <LoadingSpinner />
              )}
            </Wrapper>
          </Wrapper>
        </div>
      </div>
    </Fragment>
  );
};

export default PurchasesPage;
