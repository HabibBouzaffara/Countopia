import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ProfitExpenses() {
  const [monthlyExpenses, setmonthlyExpenses] = useState([]);
  const [monthlyProfit, setMonthlyProfit] = useState([]);
  useEffect(() => {
    const profitAndExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const profitAndExpensesRate = await fetch(
          process.env.REACT_APP_BASE_URL + "/profitAndExpenses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { monthlyExpenses, monthlyProfit } =
          await profitAndExpensesRate.json();
        if (!profitAndExpensesRate.ok) {
          throw new Error(monthlyExpenses.msg);
        }
        console.log(monthlyExpenses);
        console.log(monthlyProfit);
        setmonthlyExpenses(monthlyExpenses);
        setMonthlyProfit(monthlyProfit);
      } catch (err) {
        console.log(err);
      }
    };
    profitAndExpenses();
  }, []);
  return (
    <LineChart
      xAxis={[
        {
          id: "Months",
          data: months,
          scaleType: "band", // Use 'band' scale type for categorical data
        },
      ]}
      series={[
        {
          curve: "catmullRom",
          data: monthlyProfit,
          label: "Profit",
        },
        {
          curve: "catmullRom",
          data: monthlyExpenses,
          label: "Expenses",
        },
      ]}
      height={300}
      colors={["#81D9ED", "#F28F8F"]} // Customize the colors of the lines
    />
  );
}
