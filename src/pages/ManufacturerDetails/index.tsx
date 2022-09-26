import { useState, Fragment, SetStateAction } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useManufacturerQuery } from '../../api';
import BarChart from '../../components/charts/bar';
import PieChart from '../../components/charts/pie';
import { ManuDets } from '../../components/ManuDets';
import { colorGradient, formatMoney } from '../../utils';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import _ from 'lodash';

const ManufacturerDetails = () => {
  const { id } = useParams();
  const [year, setYear] = useState<string>();
  const { data: manufacturer } = useManufacturerQuery(
    { id, year },
    { skip: id == null }
  );
  const navigate = useNavigate();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const payment = [
    { title: 'Top Doctors Paid' },
    { title: 'Top Payments Made' },
    { title: 'Top Catalog Items' },
  ];

  // Loading Screen
  if (!manufacturer) {
    return (
      <>
        <div className='bgColor'>
          <div
            style={{
              height: '800px',
            }}
            className='p-3 rounded bg-white'
          >
            <div className='flex flex-row'>
              <div>
                <button
                  onClick={() => navigate(-1)}
                  className='border border-violet-700 bg-violet-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-violet-900 focus:outline-none focus:shadow-outline'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 '
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                    />
                  </svg>
                </button>
              </div>
              <div className='flex justify-center w-11/12'>
                <div className='flex flex-col'>
                  <div className='max-w-2xl mx-auto mt-48'>
                    <svg
                      role='status'
                      className='inline h-20 w-20 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-purple-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                  </div>
                  <p className='flex font-semibold text-violet-700 justify-center text-lg sm:text-2xl pt-2'>
                    Loading StarHealth Data...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const topStates = manufacturer.topStates
    .sort(
      (a: { totalAmount: number }, b: { totalAmount: number }) =>
        b.totalAmount - a.totalAmount
    )
    .slice(0, 10);

  const topItems = manufacturer.items
    .sort(
      (a: { totalAmount: number }, b: { totalAmount: number }) =>
        b.totalAmount - a.totalAmount
    )
    .slice(0, 10);

  return (
    <>
      <div className=' bgColor'>
        <div className='p-3 rounded bg-white'>
          <div className='flex flex-row'>
            <div>
              <button
                onClick={() => navigate(-1)}
                className='border border-violet-700 bg-violet-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-violet-900 focus:outline-none focus:shadow-outline'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 '
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                  />
                </svg>
              </button>
            </div>
          </div>

          <ManuDets
            name={manufacturer.name ?? ''}
            state={manufacturer.state ?? ''}
            country={manufacturer.country ?? ''}
            amount={formatMoney(manufacturer.totalAmount)}
            manufacturer={manufacturer}
            onChangeYear={(year) =>
              setYear((oldYear) => {
                if (!year) return undefined;
                if (oldYear === String(year)) return;

                return String(year);
              })
            }
          />
          <div>
            <div className='flex flex-col sm:flex-row gap-10 px-2'>
              <div className='inline-block align-middle sm:w-[50%]'>
                <BarChart
                  title='Top Payments By State'
                  data={{
                    labels: topStates.map((rec: { state: any }) => rec.state),
                    datasets: [
                      {
                        label: 'Total Amount',
                        backgroundColor: '#8D47FC',
                        borderWidth: 0,
                        data: topStates.map(
                          (rec: { totalAmount: any }) => rec.totalAmount
                        ),
                      },
                    ],
                  }}
                  ticks={{
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                      if (typeof value === 'string') {
                        return value;
                      }
                      const stateVals = topStates.map((rec) => rec.totalAmount);
                      if (
                        (_.min(stateVals) ?? 0) > 500000 &&
                        (_.max(stateVals) ?? 0) > 1000000
                      ) {
                        return '$' + value / 1000000 + 'M';
                      } else {
                        return formatMoney(value, 0);
                      }
                    },
                  }}
                />
              </div>
              <div className='flex justify-center sm:w-[50%]'>
                <PieChart
                  title='Top Payments By Item'
                  data={{
                    labels: topItems.map(
                      (rec: { productName: any }) =>
                        rec.productName ?? 'Unknown'
                    ),
                    datasets: [
                      {
                        label: 'Total Amount',
                        // backgroundColor: '#8D47FC',
                        backgroundColor: topItems.map((_: any, idx: number) =>
                          colorGradient(idx)
                        ),
                        borderWidth: 0,
                        data: topItems.map(
                          (rec: { totalAmount: any }) => rec.totalAmount
                        ),
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManufacturerDetails;
