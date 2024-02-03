import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navigation.module.scss";
import { AiFillBell } from "react-icons/ai";

const Navigation: React.FC<{ title: string }> = (props) => {
  return (
    <div className={classes.navigation}>
      <ul className={classes["navigation__list"]}>
        <li className={classes["navigation__item"]}>
          <Link to="/stock" className={classes["navigation__link"]}>
            {props.title}
          </Link>
        </li>
      </ul>
      <span>
        <AiFillBell />
      </span>
    </div>
  );
};

export default Navigation;
