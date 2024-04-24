import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "New Added Invoices",
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

const dataset = [
  { month: "Jan", newInvoices: 50 },
  { month: "Feb", newInvoices: 60 },
  { month: "Mar", newInvoices: 45 },
  { month: "Apr", newInvoices: 54 },
  { month: "May", newInvoices: 65 },
  { month: "June", newInvoices: 80 },
  { month: "July", newInvoices: 95 },
  { month: "Aug", newInvoices: 105 },
  { month: "Sept", newInvoices: 70 },
  { month: "Oct", newInvoices: 85 },
  { month: "Nov", newInvoices: 75 },
  { month: "Dec", newInvoices: 90 },
];

const valueFormatter = (value) => `${value} new Invoices`;

export default function InvoicesRateBar() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        {
          dataKey: "newInvoices",
          label: "New Added Invoices",
          valueFormatter,
          color: "#9EF0E3",
        },
      ]}
      {...chartSetting}
    />
  );
}
