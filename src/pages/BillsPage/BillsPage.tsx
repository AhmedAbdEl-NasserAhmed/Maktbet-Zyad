import { Fragment } from "react";
import Navigation from "../../components/Layouts/Navigation/Navigation";
import Sidebar from "../../components/Layouts/Sidebar/Sidebar";
import LoadingSpinner from "../../core-ui/LoadingSpinner/LoadingSpinner";
import InfoTable from "../../core-ui/Table/InfoTable/InfoTable";
import Wrapper from "../../core-ui/Wrapper/Wrapper";
import { useAppSelector } from "../../hooks/use-app-selector";
import { DBTables } from "../../constants";
import Button from "../../core-ui/Button/Button";
import { FaPlus } from "react-icons/fa";
import useReadData from "../../hooks/use-read-data";
import Modal from "../../core-ui/Modal/Modal";
import AddBillModalContent from "../../core-ui/Modal/AddBillModalContent/AddBillModalContent";
import useDate from "../../hooks/use-date";
import { dateMe, resetDate } from "../../helpers/functions";
import classes from "../StockPage/StockPage.module.scss";

const BillsPage: React.FC = () => {
  const { data: billsData, isLoading } = useAppSelector((state) => state.bills);

  const { showModal, hideModal, triggerModalAction } = useReadData();
  const { dateValue, onChangeDateHandler } = useDate();
  const filteredBillsData = billsData.filter(
    (bill) => resetDate(dateMe(bill.createdAt)) === resetDate(dateValue)
  );
  return (
    <Fragment>
      {showModal && (
        <Modal onHide={hideModal}>
          <AddBillModalContent hideAddBillModal={hideModal} />
        </Modal>
      )}
      <div className={classes.page}>
        <Navigation title="الفواتير" />
        <Sidebar />
        <div className={classes["page__content"]}>
          <Wrapper>
            <Button
              className={"btn btn--primary btn--add mt-sm mb-md"}
              icon={<FaPlus />}
              text={"أضف فاتورة"}
              onClick={triggerModalAction}
            />
            {!isLoading ? (
              <InfoTable
                tableId={DBTables.BILLS_TABLE}
                title="الفواتير"
                admin={true}
                data={filteredBillsData}
                dateValue={dateValue}
                onChangeDateHandler={onChangeDateHandler}
              />
            ) : (
              <LoadingSpinner />
            )}
          </Wrapper>
        </div>
      </div>
    </Fragment>
  );
};

export default BillsPage;
