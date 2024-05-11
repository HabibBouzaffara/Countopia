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

export default function SalesQuantityChart({ quantitiesRate }) {
  // Extract sales data from quantitiesRate
  if (!quantitiesRate) return null;
  const seriesData = quantitiesRate.map((product) => ({
    id: product.nom_unit,
    label: product.nom_unit,
    data: product.monthlyUnits || [],
    stack: "total",
    area: true,
    showMark: false,
  }));

  return (
    <LineChart
      xAxis={[
        {
          id: "Months",
          data: months,
          scaleType: "band",
        },
      ]}
      series={seriesData}
      width={800}
      height={300}
      colors={["#FFA8A7", "#9D8DFE", "#B3E6F1"]}
    />
  );
}
