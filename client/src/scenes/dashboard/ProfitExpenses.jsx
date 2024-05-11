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
      const monthlyExpenses = new Array(12).fill(0); // Array with 12 months initialized to 0
      const monthlyProfit = new Array(12).fill(0); // Array with 12 months initialized to 0

      // Iterate over each item in the facture array
      factures.forEach((invoice) => {
        // Preprocess date_facture to ensure it has the format mm/dd/yyyy
        const formattedDate = invoice.date_facture.split(" ")[0]; // Remove extra characters after the year
        const parts = formattedDate.split("/");
        const month = parseInt(parts[0]) - 1; // Months are zero-based, so subtract 1
        // Calculate total amount for the invoice
        const taxes = invoice.taxe * invoice.nombre_unit;
        const negativeTotal = invoice.total < 0 ? Math.abs(invoice.total) : 0;
        const total = taxes + negativeTotal;
        const totalNet = parseFloat(invoice.total_net);
        // Add total to corresponding month in arrays
        monthlyExpenses[month] += Math.abs(total);
        monthlyProfit[month] += totalNet;
      });

      // Update state outside the loop
      setMonthlyExpenses(monthlyExpenses);
      setMonthlyProfit(monthlyProfit);
    };
    profitAndExpenses();
  }, [factures]);

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
      colors={["#81D9ED", "#F28F8F"]} // Customize the colors of the lines
    />
  );
}
