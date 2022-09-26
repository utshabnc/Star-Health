import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useManufacturerQuery } from '../../api';
import BarChart from '../../components/charts/bar';
import PieChart from '../../components/charts/pie';
import { colorGradient } from '../../utils';

const Manufacturer = () => {
  const { id } = useParams();
  const [year, setYear] = useState<string>();
  const { data: manufacturer } = useManufacturerQuery(
    { id, year },
    { skip: id == null }
  );

  if (!manufacturer) {
    return <>Loading StarHealth Data...</>;
  }

  const topStates = manufacturer.topStates
    .sort((a: { totalAmount: number; }, b: { totalAmount: number; }) => b.totalAmount - a.totalAmount)
    .slice(0, 10);

  const topItems = manufacturer.items.sort((a: { totalAmount: number; }, b: { totalAmount: number; }) => b.totalAmount - a.totalAmount).slice(0,10)
  return (
    <>
      <Link to='/'>Home</Link>
      <br />
      <br />
      <input
        type='number'
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <BarChart
        title='Top Payments By State'
        data={{
          labels: topStates.map((rec: { state: any; }) => rec.state),
          datasets: [
            {
              label: 'Total Amount',
              backgroundColor: '#8D47FC',
              borderWidth: 0,
              data: topStates.map((rec: { totalAmount: any; }) => rec.totalAmount),
            },
          ],
        }}
      />
      <PieChart
        title='Top Payments By Item'
        data={{
          labels: topItems.map((rec: { productName: any; }) => rec.productName ?? 'Unknown'),
          datasets: [
            {
              label: 'Total Amount',
              // backgroundColor: '#8D47FC',
              backgroundColor: topItems.map((_: any, idx: number) =>
                colorGradient(idx)
              ),
              borderWidth: 0,
              data: topItems.map((rec: { totalAmount: any; }) => rec.totalAmount),
            },
          ],
        }}
      />
      <h2>Raw data:</h2>
      <pre>{JSON.stringify(manufacturer, null, 4)}</pre>
    </>
  );
};

export default Manufacturer;
