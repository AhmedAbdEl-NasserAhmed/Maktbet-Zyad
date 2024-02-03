import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./Sidebar.module.scss";
import { AiFillAppstore, AiFillCloseSquare } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { BsCartXFill } from "react-icons/bs";

const Sidebar: React.FC = () => {
  const sidebarActiveLinkClasses = (navData: any) => {
    return navData.isActive ? `${classes["sidebar__link--active"]}` : "";
  };

  return (
    <div className={classes.sidebar}>
      <h3 className={classes["sidebar__header"]}>مكتبة زياد</h3>
      <ul className={classes["sidebar__list"]}>
        <NavLink to="/stock" className={sidebarActiveLinkClasses}>
          <li className={classes["sidebar__item"]}>
            <span className={`${classes["sidebar__link--icon"]} fix-icon`}>
              <AiFillAppstore />
            </span>
            <span className={classes["sidebar__link--text"]}>ألرئيسيه</span>
          </li>
        </NavLink>
        <NavLink to="/store" className={sidebarActiveLinkClasses}>
          <li className={classes["sidebar__item"]}>
            <span className={`${classes["sidebar__link--icon"]} fix-icon`}>
              <FaStore />
            </span>
            <span className={classes["sidebar__link--text"]}>البضاعه</span>
          </li>
        </NavLink>
        <NavLink to="/purchases" className={sidebarActiveLinkClasses}>
          <li className={classes["sidebar__item"]}>
            <span className={`${classes["sidebar__link--icon"]} fix-icon`}>
              <MdShoppingCart />
            </span>
            <span className={classes["sidebar__link--text"]}>المشتريات</span>
          </li>
        </NavLink>
        <NavLink to="/bills" className={sidebarActiveLinkClasses}>
          <li className={classes["sidebar__item"]}>
            <span className={`${classes["sidebar__link--icon"]} fix-icon`}>
              <RiBillFill />
            </span>
            <span className={classes["sidebar__link--text"]}>الفواتير</span>
          </li>
        </NavLink>
        <NavLink to="/returned-bills" className={sidebarActiveLinkClasses}>
          <li className={classes["sidebar__item"]}>
            <span className={`${classes["sidebar__link--icon"]} fix-icon`}>
              <AiFillCloseSquare />
            </span>
            <span className={classes["sidebar__link--text"]}>المرتجع</span>
          </li>
        </NavLink>
        <NavLink to="/missing-products" className={sidebarActiveLinkClasses}>
          <li className={classes["sidebar__item"]}>
            <span className={`${classes["sidebar__link--icon"]} fix-icon`}>
              <BsCartXFill />
            </span>
            <span className={classes["sidebar__link--text"]}>المنقوصات</span>
          </li>
        </NavLink>
        <Link to="/" className={`${classes["sidebar__link--maktaba"]}`}>
          عوده الي المكتبه
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
