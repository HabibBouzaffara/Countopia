import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "Revenue Rate",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const valueFormatter = (value) => `${value}TND`;

export default function RevenueRateBar({ factures }) {
  const [revenueRate, setRevenueRate] = React.useState([]);
  React.useEffect(() => {
    const revenueRate = () => {
      const monthlyRevenue = new Array(12).fill(0); // Array with 12 months initialized to 0

      // Iterate over each item in the facture array
      factures.forEach((invoice) => {
        // Preprocess date_facture to ensure it has the format mm/dd/yyyy
        const formattedDate = invoice.date_facture.split("T")[0]; // Remove extra characters after the year
        const parts = formattedDate.split("-");
        const month = parseInt(parts[1]) - 1; // Months are zero-based, so subtract 1
        // Calculate total amount for the invoice
        const total = parseFloat(invoice.total);
        // Add total to monthly revenue if it's positive
        if (total > 0) {
          monthlyRevenue[month] += total;
        }
      });
      setRevenueRate(monthlyRevenue);
    };
    revenueRate();
  }, [factures]);

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

  return (
    <BarChart
      dataset={revenueRate.map((value, index) => ({
        month: months[index],
        revenue: value,
      }))}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        {
          dataKey: "revenue",
          label: "Revenue Rate",
          valueFormatter,
          color: " #D5CEFF",
        },
      ]}
      {...chartSetting}
      width={800}
    />
  );
}
