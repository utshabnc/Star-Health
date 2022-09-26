import { ScaleOptions, ScaleOptionsByType } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  maximumFractionDigits: 0,
  currency: 'USD',
});

const BarChart = ({
  data,
  title,
  ticks = {},
}: {
  data: React.ComponentProps<typeof Bar>['data'];
  title: string;
  ticks?: ScaleOptions['ticks'];
}) => {
  const options: React.ComponentProps<typeof Bar>['options'] = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks,
      },
      y: {
        grid: {
          display: false,
        },
      },
    },

    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
