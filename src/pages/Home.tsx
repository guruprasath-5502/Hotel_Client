import { useGetAllHotels } from '@/api/HotelApi';
import LatestDestinationCard from '@/components/LatestDestinationCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const Home = () => {
  const { hotels, isLoading } = useGetAllHotels();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-20'>
        <LoadingSpinner />
      </div>
    );
  }

  const topRowHotels = hotels?.data.slice(0, 2) || [];
  const bottomRowHotels = hotels?.data.slice(2) || [];

  return (
    <div className='space-y-3'>
      <h2 className='text-3xl font-bold'>Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className='grid gap-4'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
