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

export default function RevenueRateBar() {
  const [revenueRate, setRevenueRate] = React.useState([]);
  React.useEffect(() => {
    const revenueRate = async () => {
      try {
        const token = localStorage.getItem("token");
        const revenueRateRate = await fetch(
          process.env.REACT_APP_BASE_URL + "/revenueRate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { revenueRate } = await revenueRateRate.json();
        if (!revenueRateRate.ok) {
          throw new Error(revenueRate.msg);
        }
        console.log(revenueRate);
        setRevenueRate(revenueRate);
      } catch (err) {
        console.log(err);
      }
    };
    revenueRate();
  }, []);

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
