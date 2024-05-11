import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
export default function RevenuePie({ factures }) {
  const [monthlyPurchases, setMonthlyPurchases] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("January");

  useEffect(() => {
    const fetchSalesAndPurchases = async () => {
      const monthlyPurchases = new Array(12).fill(0);
      const monthlySales = new Array(12).fill(0);

      factures.forEach((invoice) => {
        const formattedDate = invoice.date_facture.split(" ")[0];
        const parts = formattedDate.split("/");
        const month = parseInt(parts[0]) - 1;

        const taxes =
          parseFloat(invoice.taxe) * parseFloat(invoice.nombre_unit);
        const total = parseFloat(invoice.total) + taxes;

        if (total >= 0) {
          monthlySales[month] += parseFloat(invoice.total);
        } else {
          monthlyPurchases[month] += Math.abs(total);
        }
      });
      setMonthlyPurchases(monthlyPurchases);
      setMonthlySales(monthlySales);
    };
    fetchSalesAndPurchases();
  }, [factures]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Box position="relative">
      <PieChart
        series={[
          {
            data: [
              {
                id: 0,
                value: monthlyPurchases[monthNames.indexOf(selectedMonth)],
                label: "Purchases",
                color: "#FABEBF",
              },
              {
                id: 1,
                value: monthlySales[monthNames.indexOf(selectedMonth)],
                label: "Sales",
                color: "#C1F8EF",
              },
            ],
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 20, additionalRadius: -20, color: "gray" },
          },
        ]}
        height={150}
        width={300}
      />
      <Box
        position="absolute"
        top={-25}
        right={10}
        fontWeight="bold"
        borderRadius="20px"
        padding="5px"
      >
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{
            fontWeight: "bold",
            color: "#BFB5FF",
            borderRadius: "20px",
          }}
        >
          {monthNames.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}
