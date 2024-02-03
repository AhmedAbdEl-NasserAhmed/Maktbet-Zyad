import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { StockDoc } from "../../../interfaces";
import classes from "./PieChart.module.scss";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface PieData {
  name: string;
  value: number;
}

const PieChartComponent: React.FC = () => {
  const { data: stockData } = useAppSelector((state) => state.stock);

  // const data = stockData.slice(0, 5).map((product: StockDoc) => ({
  //   name: product.category,
  //   value: product.totalNumberOfUnits,
  // }));
  const data = stockData.slice(0, 5).reduce((acc, cur) => {
    const duplicate = acc.findIndex(
      (item) => item.name === cur.category && cur.totalNumberOfUnits > 0
    );
    if (duplicate < 0) {
      const newItem = { name: cur.category, value: cur.totalNumberOfUnits };
      return acc.concat(newItem);
    } else {
      return acc;
    }
  }, [] as PieData[]);

  return (
    <div className={classes.piechart}>
      <h3 className={classes["piechart__title"]}>نسبة البضاعه</h3>
      <PieChart width={600} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <ul className={classes["piechart__options"]}>
        {data.map((option, index) => {
          return (
            <li className={classes["piechart__option"]} key={index}>
              <span
                className={classes["piechart__option--bullet"]}
                style={{ backgroundColor: COLORS[index] }}
              ></span>
              <span
                className={classes["piechart__option--value"]}
                style={{ color: COLORS[index] }}
              >
                {option.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PieChartComponent;
