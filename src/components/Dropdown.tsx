import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Item = {
  value: string;
  label: string;
};

type Props = {
  items: Item[];
  label: string;
  placeholder: string;
  value: string | undefined;
  onChange: (newValue?: string) => void;
};

const Dropdown = ({ items, label, placeholder, onChange, value }: Props) => {
  return (
    <div className='flex justify-center'>
      <p className='flex flex-row text-lg font-semibold'>
        {label}:&nbsp;
        <p className='text-violet-700'>
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
        </p>
      </p>
      <Menu as='div' className='relative text-left'>
        <div>
          <Menu.Button className='mt-1 ml-1 rounded-md inline-flex w-full justify-center text-sm font-medium text-gray-700'>
            <ChevronDownIcon className=' h-5 w-5' aria-hidden='true' />
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
            {items.map((item) => (
              <div className='py-1 flex justify-center'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      value={item.value}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full overflow-y-auto '
                      )}
                      onClick={() => onChange(item.value)}
                    >
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
