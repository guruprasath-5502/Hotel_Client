import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSignOutUser } from '@/api/UserApi';
import { Separator } from './ui/separator';

const MobileNav = () => {
  const { isLoggedIn } = useAppContext();
  const { signOutUser, isLoading } = useSignOutUser();

  const signOut = () => {
    signOutUser();
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-white' />
      </SheetTrigger>
      <SheetContent className='space-y-3'>
        <SheetTitle>
          <span className='flex text-blue-700 justify-center font-bold gap-2 xss:text-sm'>
            Welcome to Holidays
          </span>
        </SheetTitle>
        <Separator />
        <SheetDescription className='flex flex-col gap-4'>
          {isLoggedIn ? (
            <>
              <SheetClose asChild>
                <Link to='/my-bookings'>
                  <Button
                    className='text-slate-600 flex w-full justify-center items-center font-bold'
                    variant={'ghost'}
                  >
                    My Bookings
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to='/my-hotels'>
                  <Button
                    className='text-slate-600 flex  w-full justify-center items-center font-bold'
                    variant={'ghost'}
                  >
                    My Hotels
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  disabled={isLoading}
                  onClick={signOut}
                  className='bg-blue-700 text-white font-bold hover:bg-gray-100'
                >
                  Sign Out
                </Button>
              </SheetClose>
            </>
          ) : (
            <SheetClose asChild>
              <Link to={'/sign-in'}>
                <Button className='bg-blue-700 w-full text-white font-bold hover:bg-gray-100'>
                  Sign In
                </Button>
              </Link>
            </SheetClose>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
