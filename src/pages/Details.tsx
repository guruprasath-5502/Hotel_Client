import { useGetHotelById } from '@/api/SearchApi';
import GuestInfo from '@/components/GuestInfo';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { hotelId } = useParams();
  const { hotel } = useGetHotelById(hotelId);

  if (!hotel || !hotel.data) return <></>;

  return (
    <div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.data.starRating }).map(() => (
            <AiFillStar className='fill-yellow-400' />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.data.name}</h1>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {hotel.data.imageUrls.map((url) => (
          <div className='h-[300px]'>
            <img
              src={url}
              alt={hotel.data.name}
              className='rounded-md w-full h-full object-cover object-center'
            />
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
        {hotel.data.facilities.map((facility) => (
          <div className='border border-slate-300 rounded-sm p-3'>
            {facility}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[3fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel.data.description}</div>
        <div className='h-fit'>
          <GuestInfo
            hotelId={hotel.data._id}
            pricePerNight={hotel.data.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
