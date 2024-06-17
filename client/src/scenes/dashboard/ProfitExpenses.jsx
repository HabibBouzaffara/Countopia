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
const valueFormatter = (value) => `${value} TND`;
export default function ProfitExpenses({ factures }) {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [monthlyProfit, setMonthlyProfit] = useState([]);
  useEffect(() => {
    const profitAndExpenses = () => {
      const monthlyExpenses = new Array(12).fill(0);
      const monthlyProfit = new Array(12).fill(0);
      factures.forEach((invoice) => {
        const formattedDate = invoice.date_facture.split("T")[0];
        const parts = formattedDate.split("-");
        const month = parseInt(parts[1] - 1);
        const taxes = invoice.taxe * invoice.nombre_unit;
        const negativeTotal = invoice.total < 0 ? Math.abs(invoice.total) : 0;
        const total = taxes + negativeTotal;
        const totalNet = parseFloat(invoice.total_net);
        monthlyExpenses[month] += Math.round(Math.abs(total));
        monthlyProfit[month] += Math.round(totalNet);
      });
      setMonthlyExpenses(monthlyExpenses);
      setMonthlyProfit(monthlyProfit);
    };
    profitAndExpenses();
  }, [factures]);
  return (
    <LineChart
      xAxis={[{ id: "Months", data: months, scaleType: "band" }]}
      series={[
        {
          curve: "catmullRom",
          data: monthlyProfit,
          label: "Profit",
          valueFormatter,
        },
        {
          curve: "catmullRom",
          data: monthlyExpenses,
          label: "Expenses",
          valueFormatter,
        },
      ]}
      height={300}
      colors={["#81D9ED", "#F28F8F"]}
    />
  );
}
