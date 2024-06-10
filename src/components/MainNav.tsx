import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAppContext } from '@/contexts/App.Context';
import { useSignOutUser } from '@/api/UserApi';

const MainNav = () => {
  const { isLoggedIn } = useAppContext();
  const { signOutUser } = useSignOutUser();

  const signOut = () => {
    signOutUser();
  };

  return (
    <span className='flex space-x-2'>
      {isLoggedIn ? (
        <>
          <Link to='/my-bookings'>
            <Button
              className='text-white hover:text-blue-700 hover:bg-gray-50'
              variant={'ghost'}
            >
              My Bookings
            </Button>
          </Link>
          <Link to='/my-hotels'>
            <Button
              className='text-white hover:text-blue-700 hover:bg-gray-50'
              variant={'ghost'}
            >
              My Hotels
            </Button>
          </Link>
          <Button
            onClick={signOut}
            className='bg-white text-blue-700 font-bold hover:bg-gray-50'
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Link to={'/sign-in'}>
          <Button className='bg-white text-blue-700 font-bold hover:bg-gray-300'>
            Sign In
          </Button>
        </Link>
      )}
    </span>
  );
};

export default MainNav;