import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Images</h2>
      <div className='border bg-slate-100 rounded p-4 flex flex-col gap-4 '>
        <input
          type='file'
          multiple
          accept='image/*'
          className=' text-gray-700 font-normal w-full'
          {...register('imageFiles', {
            validate: (imgFiles) => {
              const totalLength = imgFiles.length;

              if (!totalLength) return 'At least one image should be added';

              if (totalLength > 6)
                return 'Total number of images cannot be more than 6';

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className='text-red-500 text-sm font-semibold'>
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImageSection;
