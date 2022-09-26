import React from 'react';
import { Pie } from 'react-chartjs-2';

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  maximumFractionDigits: 0,
  currency: 'USD',
});

const PieChart = ({
  data,
  title,
}: {
  data: React.ComponentProps<typeof Pie>['data'];
  title: string;
}) => {
  const options: React.ComponentProps<typeof Pie>['options'] = {
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide

   
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className='w-7/12'>
      <Pie options={options} data={data} />
    </div>
  );
};

export default PieChart;
