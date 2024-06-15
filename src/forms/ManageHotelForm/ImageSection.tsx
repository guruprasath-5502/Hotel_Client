import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const ImageSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const existingImgUrls = watch('imageUrls');

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setValue(
      'imageUrls',
      existingImgUrls.filter((url) => url != imageUrl)
    );
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Images</h2>
      <div className='border bg-slate-100 rounded p-4 flex flex-col gap-4 '>
        {existingImgUrls && (
          <div className='grid md:grid-cols-6 gap-4'>
            {existingImgUrls.map((url) => (
              <div className='relative group'>
                <img src={url} className='min-h-full object-cover' />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type='file'
          multiple
          accept='image/*'
          className=' text-gray-700 font-normal w-full'
          {...register('imageFiles', {
            validate: (imgFiles) => {
              const totalLength =
                imgFiles.length + (existingImgUrls?.length || 0);

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
