import moment from "moment";
import React, { useCallback } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { dateMe, resetDate } from "../../../helpers/functions";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { ReportsDoc } from "../../../interfaces";

const LineChartComponent: React.FC = () => {
  const { data: reports } = useAppSelector((state) => state.reports);

  const generateLineChartData = useCallback(() => {
    let prevDaysNumber = 1;

    let data = [];
    while (prevDaysNumber <= 6) {
      const prevWeek = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - prevDaysNumber
      );
      const prevWeekTime = resetDate(prevWeek);

      const report = reports.find(
        (report: ReportsDoc) =>
          resetDate(dateMe(report.createdAt)) === prevWeekTime
      );

      data.push({
        name: moment(prevWeekTime).format("dddd"),
        income: report?.income,
        expenses: report?.expenses,
      });

      prevDaysNumber++;
    }
    return data.reverse();
  }, [reports]);

  let incomeData = generateLineChartData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={incomeData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
