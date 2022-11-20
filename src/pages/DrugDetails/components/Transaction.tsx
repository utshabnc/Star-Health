import { Link } from 'react-router-dom';
import {
  formatMoney,
  formatName,
  formatProductName,
  formatProductType,
} from '../../../utils';

const Transaction = ({
  transaction: {
    amount,
    contextualInfo,
    paymentNature,
    date,
    doctorId,
    doctorName,
    id,
    manufacturerId,
    manufacturerName,
    paymentType,
    productCategory,
    productName,
    productType,
    year,
  },
}) => (
  <div className='flex justify-center w-full'>
    <div className='rounded-lg shadow-lg bg-white text-center w-full lg:w-3/4'>
      <div className='p-2 w-full'>
        <div className='flex flex-row justify-between'>
          <h5 className='text-gray-900 text-md font-medium mb-2 underline'>
            <Link to={`/manufacturer/${manufacturerId}`}>
              {manufacturerName}
            </Link>
          </h5>
          <p className='text-gray-700 text-base mb-1'>
            {' '}
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
        <div className='flex flex-row justify-between'>
          <h5 className='text-gray-900 text-md mb-2'>
            Doctor: {formatName(doctorName)}
          </h5>
          <p className='text-gray-700 text-base mb-1'> {formatMoney(amount)}</p>
        </div>
        <div className='flex flex-row text-sm justify-between'>
          <p className='text-gray-700 text-base mb-1'>
            Context: {paymentNature}
          </p>

          <div className='border-gray-300 text-gray-600'></div>
        </div>
      </div>
    </div>
  </div>
);

export default Transaction;
