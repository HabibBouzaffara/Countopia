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

const dataset = [
  { month: "Jan", revenue: 1500 },
  { month: "Feb", revenue: 1600 },
  { month: "Mar", revenue: 1450 },
  { month: "Apr", revenue: 1540 },
  { month: "May", revenue: 1650 },
  { month: "June", revenue: 1800 },
  { month: "July", revenue: 1950 },
  { month: "Aug", revenue: 2105 },
  { month: "Sept", revenue: 1770 },
  { month: "Oct", revenue: 1850 },
  { month: "Nov", revenue: 1575 },
  { month: "Dec", revenue: 1900 },
];

const valueFormatter = (value) => `${value}TND`;

export default function RevenueRateBar() {
  return (
    <BarChart
      dataset={dataset}
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
