import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import MainNav from './MainNav';
const Header = () => {
  return (
    <div className='bg-blue-800 p-5'>
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to={'/'}>Holidays</Link>
        </span>
        <div className='md:hidden'>
          <MobileNav />
        </div>
        <div className='hidden md:block'>
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
