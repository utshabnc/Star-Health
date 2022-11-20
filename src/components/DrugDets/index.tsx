import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { Fragment, SetStateAction, useEffect, useState } from 'react';
import { availableYears, formatName, formatNumber } from '../../utils';
import _ from 'lodash';
import { Link } from 'react-router-dom';


interface DrugSchema {
  name: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const DrugDets = (schema: DrugSchema) => {
  const d = new Date();
  const [year, setYear] = useState(0);

  // useEffect(() => {
  //   schema.onChangeYear(year == 0 ? undefined : year);
  // }, [year]);

  // const numStars = _.mean(
  //   schema.doctor.reviews?.map((review) => review.rating)
  // );

  // console.log({ numStars });

  // const numReviews = schema.doctor.reviews?.length ?? 0;

  return (
    <>
      <div className='flex flex-col justify-end lg:px-28 sm:px-2'>
        <p className='text-violet-700 text-2xl font-semibold'>
          {formatName(schema.name)}
        </p>
        
        <div className='my-1'>
          <hr />
        </div>
        <div className='flex flex-col sm:flex-row sm:h-[60px] justify-around items-center'>
          <div className='flex'>
            <p className='flex flex-row text-lg font-semibold'>
              Payments for:&nbsp;
              <p className='text-violet-700'>
                {year === 0 ? 'All Years' : year}
              </p>
            </p>
            <Menu as='div' className='relative text-left'>
              <div>
                <Menu.Button className='inline-flex w-full justify-center bg-white text-sm font-medium text-gray-700'>
                  <ChevronDownIcon
                    className='ml-1 mt-1 h-5 w-5'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='overflow-y-auto absolute right-0 mt-2 h-56 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        value={0}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full overflow-y-auto '
                        )}
                        onClick={() => setYear(0)}
                      >
                        {'All Years'}
                      </button>
                    )}
                  </Menu.Item>
                  {availableYears.map((year) => (
                    <div className='py-1 flex justify-center'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            value={year}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm w-full overflow-y-auto '
                            )}
                            onClick={() => setYear(year)}
                          >
                            {year}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className='flex'>
            <p className='text-gray-800 text-lg font-semibold flex'>
              Total transaction sum:&nbsp;
              <p className='text-violet-700'>$1250.00</p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
