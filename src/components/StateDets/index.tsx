import { Fragment, SetStateAction, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import {
  availableYears,
  drugTypes,
  formatMoney,
  formatName,
  formatNumber,
  formatProductName,
  formatProductType,
} from '../../utils';
import _ from 'lodash';
import manufacturer, {
  ManufacturerResponse,
} from '../../../functions/src/manufacturer';
import { Link } from 'react-router-dom';
import { StateResponse } from '../../../functions/src/state';
import Dropdown from '../Dropdown';
import CountyHeatmap from '../charts/CountyHeatmap';

interface StateSchema {
  onChangeYear: (year?: number) => void;
  drugType?: string;
  year?: string;
  onChangeDrugType: (drugType?: string) => void;
  state: StateResponse;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const StateDets = ({
  state,
  year,
  onChangeYear,
  drugType,
  onChangeDrugType,
}: StateSchema) => {
  const d = new Date();

  console.log('S', state.summaryRank);
  return (
    <>
      <div className='flex flex-col justify-end lg:px-24'>
        <div className='flex flex-row justify-between'>
          <div>
            <p className='text-violet-700 text-3xl p-1 font-semibold'>
              {state.name}
            </p>
            <p className='text-xl font-semibold text-purp-2'>
              #{formatNumber(Math.min(state.rank ?? 0, 50))} of{' '}
              {formatNumber(50)} in Company Payments to Doctors
            </p>
            {drugType && (
              <p className='text-xl font-semibold text-purp-2'>
                #{formatNumber(Math.min(state.summaryRank ?? 0, 50))} of{' '}
                {formatNumber(50)} for type: {_.capitalize(drugType)}
              </p>
            )}
          </div>
          <CountyHeatmap
            state={state?.id ?? ''}
            data={state?.counties ?? []}
            width={250}
            height={150}
          />
        </div>
        <div className='my-1'>
          <hr />
        </div>

        {/* <p className='pt-1 text-lg text-purp-5'>State: {schema.state}</p>
        <p className='pt-1 text-lg text-purp-5'>Country: {schema.country}</p> */}

        <div className='grid lg:grid-cols-3 sm:grid-rows-3 mb-3 lg:h-4'>
          <Dropdown
            items={drugTypes.map((type) => ({
              value: type,
              label: _.capitalize(type),
            }))}
            label={'Drug Type'}
            value={drugType}
            placeholder={'All'}
            onChange={onChangeDrugType}
          />
          <div className='flex justify-center'>
            <div className='flex flex-row'>
              <p className='flex flex-row text-lg font-semibold'>
                Payments for:&nbsp;
                <p className='text-violet-700'>{!year ? 'All Years' : year}</p>
              </p>
              <Menu as='div' className='relative text-left'>
                <div>
                  <Menu.Button className='inline-flex w-full justify-center bg-white text-sm font-medium text-gray-700'>
                    <ChevronDownIcon
                      className='ml-2 mt-1 h-5 w-5'
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
                    <div className='py-1 flex justify-center'>
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
                            // onClick={() => onChangeear(year)}
                          >
                            All Years
                          </button>
                        )}
                      </Menu.Item>
                    </div>
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
                              onClick={() => onChangeYear(year)}
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
          </div>
          <div className='flex justify-center pt-1'>
            <p className='text-gray-800 text-lg font-semibold flex'>
              Total Payments:&nbsp;
              <p className='text-violet-700'>
                {formatMoney(state.totalAmount)}
              </p>
            </p>
          </div>
        </div>
        <div className='grid grid-cols-1'>
          <div className=' my-2 mx-1 p-2 border-2 border-violet-400 rounded-lg grid grid-cols-2'>
            <div className='flex flex-col '>
              <p className='flex justify-center text-sm sm:text-base underline font font-semibold'>
                Top Paid Doctors
              </p>
              <ul className='flex flex-col items-center'>
                {state.topDoctors
                  .sort((a, b) => b.totalAmount - a.totalAmount)
                  .slice(0, 4)
                  .map((rec) => {
                    return (
                      <li key={rec.doctor.id}>
                        <Link to={`/doctor/${rec.doctor.id}`}>
                          <a className='text-purp-2'>
                            {formatName(
                              `${rec.doctor.firstName} ${rec.doctor.lastName}`
                            )}
                          </a>
                        </Link>
                        : {formatMoney(rec.totalAmount)}
                      </li>
                    );
                  })}
              </ul>
            </div>
            {/* <div className='flex flex-col '>
              <p className='flex justify-center underline font font-semibold'>
                Largest Payments
              </p>
              <ul className='flex flex-col items-center'>
                {schema.manufacturer.largestPayments
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 4)
                  .map((rec) => {
                    return (
                      <li key={rec.doctor.id}>{formatMoney(rec.amount)}</li>
                    );
                  })}
              </ul>
            </div> */}
            <div className='flex flex-col '>
              <p className='flex justify-center text-sm sm:text-base underline font font-semibold'>
                Most Common Items
              </p>
              <ul className='flex flex-col items-center'>
                {state.topItems
                  .sort((a, b) => b.transactionCount - a.transactionCount)
                  .slice(0, 4)
                  .map((rec, idx) => {
                    return (
                      <li key={`${rec.productName}-${idx}`}>
                        {formatProductType(rec.productType)}:{' '}
                        {formatProductName(rec.productName)} (
                        {formatNumber(rec.transactionCount)})
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
