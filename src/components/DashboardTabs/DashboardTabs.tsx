import { useEffect, useRef } from "react";
import { DBTables } from "../../constants";
import { useAppSelector } from "../../hooks/use-app-selector";
import classes from "./DashboardTabs.module.scss";

const Tabs: React.FC<{ getDisplayContentValue: Function }> = (props) => {
  const tabsTracerRef = useRef<HTMLDivElement>(null);

  const tabsActiveItemRef = useRef<HTMLLIElement>(null);

  const { dailyBills } = useAppSelector((state) => state.bills);
  const { dailyOutlays } = useAppSelector((state) => state.outlays);
  //prettier-ignore
  const { data: missingProducts } = useAppSelector((state) => state.missingProducts);

  const moveTheTracer = (event: React.MouseEvent<HTMLLIElement>) => {
    const targetElement = event.target as HTMLLIElement;

    const clicked = targetElement.closest(
      `.${classes["tabs__item"]}`
    ) as HTMLLIElement;

    if (!clicked) return;

    props.getDisplayContentValue(clicked.dataset.content);

    Array.from(clicked.parentElement!.children).forEach((siblings) =>
      siblings.classList.remove(`${classes["tabs__item--active"]}`)
    );

    clicked.classList.add(`${classes["tabs__item--active"]}`);

    const targetElementContentWidth = clicked.firstElementChild?.clientWidth;

    if (tabsTracerRef.current) {
      //prettier-ignore
      tabsTracerRef.current.style.left = `${targetElement.offsetLeft}px`;
      tabsTracerRef.current.style.width = `${targetElementContentWidth}px`;
    }
  };
  useEffect(() => {
    if (tabsTracerRef.current) {
      const tabsTraceStartPosition =
        tabsActiveItemRef.current!.offsetLeft +
        tabsActiveItemRef.current!.clientWidth -
        tabsActiveItemRef.current!.firstElementChild!.clientWidth;
      //prettier-ignore
      tabsTracerRef.current.style.left = `${tabsTraceStartPosition}px`;
      tabsTracerRef.current.style.width = `${tabsActiveItemRef.current?.firstElementChild?.clientWidth}px`;
    }
  }, [tabsActiveItemRef, tabsTracerRef]);
  return (
    <ul className={classes.tabs}>
      <li
        className={`${classes["tabs__item"]} ${classes["tabs__item--active"]}`}
        onClick={moveTheTracer}
        ref={tabsActiveItemRef}
        data-content={DBTables.STOCK_TABLE}
      >
        <span>البضاعه</span>
      </li>
      <li
        className={classes["tabs__item"]}
        onClick={moveTheTracer}
        data-content={DBTables.BILLS_TABLE}
      >
        <span>الفواتير</span>
        <span className={classes["tabs__item--count"]}>
          {dailyBills.length}
        </span>
      </li>
      <li
        className={classes["tabs__item"]}
        onClick={moveTheTracer}
        data-content={DBTables.MISSING_PRODUCTS_TABLE}
      >
        <span>المنقوصات</span>
        <span className={classes["tabs__item--count"]}>
          {missingProducts.length}
        </span>
      </li>
      <li
        className={classes["tabs__item"]}
        onClick={moveTheTracer}
        data-content={DBTables.OUTLAYS_TABLE}
      >
        <span>الخوارج</span>
        <span className={classes["tabs__item--count"]}>
          {dailyOutlays.length}
        </span>
      </li>
      <div className={classes["tabs__tracer"]} ref={tabsTracerRef}></div>
    </ul>
  );
};

export default Tabs;
