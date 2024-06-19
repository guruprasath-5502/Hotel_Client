import { useForm } from 'react-hook-form';
import { SingleDatePicker } from './SingleDatePicker';
import { useSearchContext } from '@/contexts/SearchContext';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from './ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = { hotelId: string; pricePerNight: number };

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfo = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const handleCheckInChange = (date?: Date) => {
    if (date) {
      setValue('checkIn', date as Date);

      if (date > checkOut) {
        setValue('checkOut', date as Date);
      }
    }
  };

  const handleCheckOutChange = (date?: Date) => {
    if (date) {
      setValue('checkOut', date as Date);
    }
  };

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate('/sign-in', { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate(`/hotel${hotelId}/booking`);
  };

  return (
    <div className='flex flex-col p-4 bg-blue-200 gap-4'>
      <h3 className='font-bold'>Rs {pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className='grid grid-cols-1 gap-4 items-center'>
          <div>
            <SingleDatePicker
              {...register('checkIn', {
                required: 'This field is required',
              })}
              date={checkIn}
              onChange={handleCheckInChange}
            />
            {errors.checkIn && (
              <span className='text-red-500 font-semibold text-sm'>
                {errors.checkIn.message}
              </span>
            )}
          </div>
          <div>
            <SingleDatePicker
              {...register('checkOut', {
                required: 'This field is required',
              })}
              date={checkOut}
              onChange={handleCheckOutChange}
              fromDate={checkIn}
            />
            {errors.checkOut && (
              <span className='text-red-500 font-semibold text-sm'>
                {errors.checkOut.message}
              </span>
            )}
          </div>
          <div className='flex bg-white px-2 py-1 gap-2 rounded flex-1 w-full'>
            <label className='items-center flex flex-1 text-sm'>
              Adults :{' '}
              <input
                className='w-full p-1 focus:outline-none  flex-1'
                type='number'
                min={1}
                max={20}
                {...register('adultCount', {
                  required: 'This field is required',
                  min: {
                    value: 1,
                    message: 'There must be at least one adult',
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className='items-center flex flex-1 text-sm'>
              Children :{' '}
              <input
                className='w-full p-1 focus:outline-none flex-1'
                type='number'
                min={0}
                max={20}
                {...register('childCount', {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className='text-red-500 font-semibold text-sm'>
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <Button
              type='submit'
              className='bg-blue-700 text-white font-bold text-xl hover:bg-blue-600'
            >
              Book Now
            </Button>
          ) : (
            <Button
              type='submit'
              className='bg-blue-700 text-white font-bold text-xl hover:bg-blue-600'
            >
              Sign in to Book
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfo;
