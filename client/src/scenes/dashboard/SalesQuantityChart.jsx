import * as React from "react";
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

const product1Sales = [
  100, 120, 130, 110, 150, 140, 160, 180, 200, 190, 210, 220,
];
const product2Sales = [
  80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190,
];
const product3Sales = [70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];

export default function SalesQuantityChart() {
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
          id: "Product1",
          label: "Product 1",
          data: product1Sales,
          stack: "total",
          area: true,
          showMark: false,
          
        },
        {
          id: "Product2",
          label: "Product 2",
          data: product2Sales,
          stack: "total",
          area: true,
          showMark: false,
          
        },
        {
          id: "Product3",
          label: "Product 3",
          data: product3Sales,
          stack: "total",
          area: true,
          showMark: false,
         
        },
      ]}
      width={800}
      height={300}
      colors={['#FFA8A7', '#9D8DFE', '#B3E6F1']}
    />
  );
}
