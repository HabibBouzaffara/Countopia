import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 30, label: 'Expences', color: '#FABEBF'},
  { id: 1, value: 70, label: 'Sales', color: '#C1F8EF'},
];

export default function RevenuePie() {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={150}
    />
  );
}
