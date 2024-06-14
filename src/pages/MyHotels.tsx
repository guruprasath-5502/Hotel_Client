import { useGetHotels } from '@/api/HotelApi';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const MyHotels = () => {
  const { hotels, isLoading } = useGetHotels();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-20'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!hotels) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className='space-y-5'>
      <span className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>
        <Button className='bg-blue-700 text-white font-bold text-xl hover:bg-blue-600 flex items-center'>
          <Link to='/add-hotel'>Add Hotel</Link>
        </Button>
      </span>
      <div className='grid grid-cols-1 gap-8'>
        {hotels.data.map((hotel) => (
          <div className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'>
            <h2 className='text-2xl font-bold'>{hotel.name}</h2>
            <div className='whitespace-pre-line overflow-hidden'>
              {hotel.description}
            </div>
            <div className='grid lg:grid-cols-5 gap-2'>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BsMap className='mr-1' />
                {hotel.city}, {hotel.country}
              </div>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BsBuilding className='mr-1' />
                {hotel.type}
              </div>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiMoney className='mr-1' />${hotel.pricePerNight} per night
              </div>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiHotel className='mr-1' />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiStar className='mr-1' />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className='flex justify-end'>
              <Button className='bg-blue-700 text-white font-bold text-xl hover:bg-blue-600 flex items-center'>
                <Link to={`/edit-hotel/${hotel._id}`}>View Details</Link>
              </Button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
