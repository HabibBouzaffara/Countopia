import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
export default function ExpensesPie({ factures }) {
  const [totalExpenses, setTotalExpenses] = React.useState(0);
  const [totalTaxes, setTotalTaxes] = React.useState(0);

  React.useEffect(() => {
    const calculateTaxesAndExpenses = async () => {
      let totalTaxes = 0;
      let totalExpenses = 0;

      // Iterate over each item in the facture array
      factures.forEach((invoice) => {
        // Calculate taxes for the invoice
        const taxes = invoice.taxe * invoice.nombre_unit;
        totalTaxes += taxes;

        // Calculate expenses for the invoice
        const total = invoice.total < 0 ? Math.abs(invoice.total) : 0;
        totalExpenses += total;
      });
      setTotalExpenses(totalExpenses);
      setTotalTaxes(totalTaxes);
    };
    calculateTaxesAndExpenses();
  }, [factures]);

  return (
    <PieChart
      series={[
        {
          innerRadius: 45,
          data: [
            { id: 0, value: totalTaxes, label: "Taxes", color: "#D5CEFF" },
            {
              id: 1,
              value: totalExpenses,
              label: "Purchases",
              color: "#B3E6F1",
            },
          ],

          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={150}
    />
  );
}
