import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { Fragment, SetStateAction, useEffect, useState } from 'react';
import { availableYears, formatName, formatNumber } from '../../utils';
// import { DoctorResponse } from '../../../functions/src/doctor';
import _ from 'lodash';
import { Link } from 'react-router-dom';

interface DocSchema {
  firstName: string;
  middleName?: any;
  lastName: string;
  addressLine1: string;
  addressLine2?: any;
  city: string;
  state: string;
  specialty: string;
  reviews?: string[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChangeYear: (year?: number) => void;
  totalAmount: string;
  doctor: any;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NUM_DOCTORS = 1267275;

export const DocDets = (schema: DocSchema) => {
  const d = new Date();
  const [year, setYear] = useState(0);

  useEffect(() => {
    schema.onChangeYear(year == 0 ? undefined : year);
  }, [year]);

  const numStars = _.mean(
    schema.doctor.reviews?.map((review) => review.rating)
  );

  console.log({ numStars });

  const numReviews = schema.doctor.reviews?.length ?? 0;

  return (
    <>
      <div className='flex flex-col justify-end lg:px-28 sm:px-2'>
        <p className='text-violet-700 text-2xl font-semibold'>
          {formatName(schema.doctor.firstName + ' ' + schema.doctor.lastName)}
        </p>
        <div className='flex flex-row space-x-2 items-center'>
          <ReactStars
            edit={false}
            value={numStars}
            isHalf={true}
            count={5}
            size={screen.width > 1000 ? 24 : 15}
            activeColor='#ffd700'
          />
          <div className='flex flex-row items-center'>
            <p className='ml-2 text-sm font-bold text-gray-900 dark:text-white'>
              {isNaN(numStars) ? '' : numStars.toFixed(1)}
            </p>
            {!isNaN(numStars) && (
              <span className='w-1 h-1 mx-1.5'></span>
            )}
            <Link to={`/doctor/${schema.doctor.id}/reviews`}>
              <a className='text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white'>
                {numReviews} {numReviews === 1 ? 'review' : 'reviews'}
              </a>
            </Link>
          </div>
        </div>
        <p className='lg:text-xl sm:text-sm font-semibold text-purp-2'>
          Payments Received: #{formatNumber(schema.doctor.rank ?? 0)} of{' '}
          {formatNumber(NUM_DOCTORS)}
        </p>
        <p className='pt-1 lg:text-lg sm:text-xs text-purp-5'>
          Specialty: {schema.specialty}
        </p>
        <p className='pt-1 lg:text-lg sm:text-xs text-purp-5'>
          Location:{' '}
          {schema.addressLine1 + ', ' + schema.city + ', ' + schema.state}
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
              Pay from Manufacturers:&nbsp;
              <p className='text-violet-700'>{schema.totalAmount}</p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
