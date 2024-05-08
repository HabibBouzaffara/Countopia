import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

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

export default function ProfitLoss() {
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
        { curve: "catmullRom", data: [0, 5, 2, 6, 3, 9.3,0, 5, 2, 6, 3, 9.3,], label: "Profit" },
        { curve: "catmullRom", data: [6, 3, 7, 9.5, 4, 2,6, 3, 7, 9.5, 4, 2], label: "Loss" },
      ]}
      height={300}
      colors={["#F28F8F", "#81D9ED"]} // Customize the colors of the lines
    />
  );
}
