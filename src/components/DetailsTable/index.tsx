import { capitalize } from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import { formatName } from '../../utils';
import './index.css';

interface ResultSchema {
  id: string;
  name: string;
  location: string;
  type: 'doctor' | 'manufacturer';
}

const tableHeaders =
  screen.width > 1000
    ? [{ title: 'Type' }, { title: 'Name' }, { title: 'Location' }]
    : [{ title: 'Name' }, { title: 'Location' }];

function DetailsTable({ rows }: { rows: ResultSchema[] }) {
  const navigation = useNavigate();
  return (
    <>
      <section className='antialiased text-gray-600 py-4' x-data='app'>
        <div className='flex flex-row'>
          <div className='max-h-[300px] overflow-scroll mx-auto bg-white shadow-lg rounded-lg border border-gray-200'>
            <div className='overflow-x-auto p-3 '>
              <table className='table-auto w-full'>
                <thead className='text-xs font-semibold uppercase text-gray-500'>
                  <tr>
                    {tableHeaders.map((item) => (
                      <th className='p-2'>
                        <div className='text-sm font-semibold text-left'>
                          {item.title}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='text-sm divide-y divide-gray-100'>
                  {rows.map((row) => (
                    <tr>
                      {screen.width > 1000 && (
                        <td className='p-2'>
                          <div className='font-medium text-base text-left text-violet-700'>
                            {capitalize(row.type)}
                          </div>
                        </td>
                      )}
                      <td className='p-2'>
                        <Link to={`/${row.type}/${row.id}`}>
                          <p className='font-medium text-base text-left sm:underline lg:no-underline text-violet-700'>
                            {formatName(row.name)}
                          </p>
                        </Link>
                      </td>
                      <td className='p-2'>
                        <div className='font-medium text-base text-left text-violet-700'>
                          {row.location}
                        </div>
                      </td>
                      {screen.width > 1000 && (
                        <td className='p-2'>
                          <div className='flex justify-center'>
                            <button
                              onClick={() =>
                                navigation(`/${row.type}/${row.id}`)
                              }
                              className='buttonText bg-violet-600 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease hover:bg-violet-700 active:bg-violet-800'
                            >
                              Open
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr
                style={{
                  height: '1px',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailsTable;
