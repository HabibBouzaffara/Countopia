import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 30, label: 'ExpencesTaxes', color: '#D5CEFF'},
  { id: 1, value: 70, label: 'SalesTaxes', color: '#B3E6F1'},
];

export default function TaxPie() {
  return (
    <PieChart
      series={[
        {
          innerRadius: 45,
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={150}
    />
  );
}
