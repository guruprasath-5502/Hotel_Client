import LoadingSpinner from '@/components/LoadingSpinner';
import { useAppContext } from '@/contexts/App.Context';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isLoggedIn, isAuthLoading } = useAppContext();

  if (isAuthLoading) {
    return (
      <div className='flex flex-col min-h-screen'>
        <div className='container mx-auto flex-1 py-10 flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to='/' replace />;
};

export default ProtectedRoute;
