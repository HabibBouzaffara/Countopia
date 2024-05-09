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

export default function SalesQuantityChart() {
  const [quantitiesRate, setQuantitiesRate] = React.useState([]);

  React.useEffect(() => {
    const fetchQuantitiesRate = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          process.env.REACT_APP_BASE_URL + "/bestSeller",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { top3BestSellers } = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch quantities rate");
        }
        setQuantitiesRate(top3BestSellers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuantitiesRate();
  }, []);

  // Extract sales data from quantitiesRate
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
