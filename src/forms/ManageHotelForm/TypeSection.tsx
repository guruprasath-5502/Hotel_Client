import { hotelTypes } from '@/config/hotel-options-config';
import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch('type');

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Type</h2>
      <div className='grid grid-cols-3 md:grid-cols-5 gap-2'>
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={
              typeWatch === type
                ? 'cursor-pointer bg-blue-400 text-sm rounded-full px-4 py-2 font-semibold flex items-center justify-center'
                : 'cursor-pointer bg-slate-200 text-sm rounded-full px-4 py-2 font-semibold flex items-center justify-center'
            }
          >
            <input
              className='hidden'
              type='radio'
              value={type}
              {...register('type', {
                required: 'This field is required',
              })}
            />
            <span className='tracking-tighter md:tracking-normal font-semibold'>
              {type}
            </span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className='text-red-500 text-sm font-semibold'>
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
