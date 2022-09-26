import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '../../hooks';
import { signIn, signOut } from '../../firebase';
import { debounce } from 'lodash';
import { useLazySearchQuery } from '../../api';
import '../../index.css';
import SearchPage from '../../pages/SearchPage';

function NavBar() {
  const [user, loading] = useUser();
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = () => {
    navigate(`/?search=${search}`);
  };

  return (
    <>
      <nav className='bg-nav p-1'>
        <div className='flex-1 flex flex-row justify-center items-center'>
          {location.pathname === '/' && screen.width < 1000 && (
            <div className={``}>
              <Link to={'/'}>
                <img src={'/images/Logo.png'} className=' h-12' />
              </Link>
            </div>
          )}

          <div
            style={{ position: 'absolute', left: 5 }}
            className='flex flex-row lg:ml-2  lg:max-w-[100px]  items-center'
          >
            {location.pathname !== '/' && (
              <>
                <SearchPage
                  buttonSmall
                  buttonPlaceholder={screen.width <= 640 ? 'Search' : undefined}
                />
              </>
            )}
          </div>

          <div style={{ opacity: screen.width > 1000 ? 1 : 0 }}>
            <Link to={'/'}>
              <img src={'/images/Logo.png'} className='h-12' />
            </Link>
          </div>

          <div
            style={{
              minWidth: screen.width > 1000 ? 400 : 100,
              position: 'absolute',
              right: '10px',
            }}
            className={`flex flex-row items-center space-x-2 ${
              loading && 'opacity-0'
            }`}
          >
            {screen.width > 1000 && (
              <p className={`text-white   ${user == null && 'opacity-0'} `}>
                Signed in as {user?.email ?? 'someemail@email.com'}
              </p>
            )}
            {user?.email ? (
              <button
                className='w-24 lg:w-22 bg-rose-400 hover:bg-rose-500 active:bg-rose-600 rounded px-3 py-1'
                type='button'
                onClick={signOut}
              >
                Sign out
              </button>
            ) : (
              <button
                className='w-24 lg:w-22 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded px-3 py-1'
                onClick={signIn}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
