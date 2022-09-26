import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import { useLazySearchQuery } from '../../api';
import './index.css';
import DetailsTable from '../../components/DetailsTable';
import { formatName } from '../../utils';
import Search from '../../components/Search';
import { Popover } from 'react-tiny-popover';

type Props = {
  buttonStyle?: string;
  buttonPlaceholder?: string;
  buttonSmall?: boolean;
};

const SearchPage = ({ buttonPlaceholder, buttonSmall }: Props) => {
  const { search: querySearch } = useLocation();
  const [search, setSearch] = useState<string>();
  const { data: searchResults, query: fetchSearchResults } =
    useLazySearchQuery();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(querySearch);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [querySearch]);

  const debouncedSearch = useCallback(
    debounce(async (search) => {
      if (search.length < 2) return;
      setIsPopoverOpen(true);
      fetchSearchResults({ search });
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  const SearchResults = () => {
    if (!searchResults) return null;
    if (
      searchResults?.doctors?.length === 0 &&
      searchResults?.manufacturers?.length === 0
    ) {
      return null;
    }
    return (
      <div style={{ marginLeft: 20 }} className='flex'>
        <div
          onClick={() => setIsPopoverOpen(false)}
          className='modal-close absolute top-1 right-0 cursor-pointer flex flex-col items-center mt-4 mr-1 text-sm z-50'
        >
          <svg
            className='fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 18 18'
          >
            <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
          </svg>
        </div>
        <DetailsTable
          rows={[
            ...searchResults!.doctors.map(
              ({ id, firstName, lastName, city, state }) => ({
                id,
                name: `${firstName} ${lastName}`,
                location: `${formatName(city)}, ${state}`,
                type: 'doctor' as 'doctor',
              })
            ),
            ...searchResults!.manufacturers.map(
              ({ id, name, state, country }) => ({
                id,
                name,
                location: `${state}, ${country}`,
                type: 'manufacturer' as 'doctor',
              })
            ),
          ]}
        />
      </div>
    );
  };
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom']} // preferred positions by priority
      content={<SearchResults />}
      onClickOutside={() => setIsPopoverOpen(false)}
    >
      <input
        type='text'
        placeholder={
          buttonPlaceholder ?? 'Search for Doctor, Company, or Drug Data'
        }
        className={`
              ${buttonSmall ? 'max-w-[160px]' : ''}
               mx-2 sm:mx-0 sm:min-w-[400px] sm:max-w-[400px] focus:ring-violet-400 border-2 focus:border-violet-600 pl-3 pr-3  text-sm sm:text-md text-white placeholder-white border-violet-800 bg-violet-500 rounded-md h-9`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Popover>
  );
};

export default SearchPage;
