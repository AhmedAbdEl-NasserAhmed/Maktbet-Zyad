import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Fragment } from "react";

const BackdropComponent: React.FC<{
  onHide: (event: React.MouseEvent) => void;
}> = (props) => {
  return <div className={classes.backdrop} onClick={props.onHide}></div>;
};

const ModalComponent: React.FC<{ onHide: (event: React.MouseEvent) => void }> =
  (props) => {
    return (
      <div className={classes.modal}>
        <span className={classes["modal__close"]} onClick={props.onHide}>
          <AiOutlineClose className="fix-icon" />
        </span>
        {props.children}
      </div>
    );
  };

const Modal: React.FC<{
  onHide: (event: React.MouseEvent) => void;
}> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackdropComponent onHide={props.onHide} />,
        document.getElementById("backdrop") as HTMLDivElement
      )}
      {ReactDOM.createPortal(
        <ModalComponent onHide={props.onHide}>{props.children}</ModalComponent>,
        document.getElementById("modal-overlay") as HTMLDivElement
      )}
    </Fragment>
  );
};

export default Modal;
