import React from "react";
import ReactDOM from "react-dom";
import { FaBan, FaCheck, FaExclamation } from "react-icons/fa";
import { useAppSelector } from "../../hooks/use-app-selector";
import classes from "./Snackbar.module.scss";

const SnackBar: React.FC<{ type: string; message: string }> = React.memo(
  (props) => {
    const { status } = useAppSelector((state) => state.snackbar);
    const SnackBarEl: React.FC<{ type: string; message: string }> = (props) => {
      return (
        <div
          className={`${classes.snackbar} ${
            classes[`snackbar--${props.type}`]
          }`}
        >
          <div
            className={`${classes["snackbar__icon"]} ${
              classes[`snackbar__icon--${props.type}`]
            }`}
          >
            {props.type === "success" && <FaCheck />}
            {props.type === "error" && <FaBan />}
            {props.type === "warning" && <FaExclamation />}
          </div>
          <p className={classes["snackbar__message"]}>{props.message}</p>
        </div>
      );
    };
    return ReactDOM.createPortal(
      <SnackBarEl type={props.type} message={props.message} />,
      document.getElementById("snackbar-overlay") as HTMLDivElement
    );
  }
);

export default SnackBar;
