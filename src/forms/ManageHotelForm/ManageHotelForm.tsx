import { FormProvider, useForm } from 'react-hook-form';
import DetailSection from './DetailSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './GuestSection';
import ImageSection from './ImageSection';
import { Button } from '@/components/ui/button';
import { useCreateHotel, useUpdateHotelById } from '@/api/HotelApi';
import { Loader2 } from 'lucide-react';
import { HotelObj } from '@/types';
import { useEffect } from 'react';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  adultCount: number;
  childCount: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  hotel?: HotelObj;
  isEdit: boolean;
};

const ManageHotelForm = ({ hotel, isEdit = false }: Props) => {
  const formMethods = useForm<HotelFormData>();

  const { createHotel, isLoading: isCreateLoading } = useCreateHotel();

  const { updateHotel, isLoading: isEditLoading } = useUpdateHotelById();

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
      formData.append('hotelId', hotel._id.toString());
    }
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('type', formDataJson.type);
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((urls, index) => {
        formData.append(`imageUrls[${index}]`, urls);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    if (isEdit) {
      updateHotel(formData);
    } else {
      createHotel(formData);
    }
  });

  return (
    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={onSubmit}>
        <DetailSection isEdit={isEdit} />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />
        <span className='flex justify-end'>
          <Button
            disabled={isEditLoading || isCreateLoading}
            type='submit'
            className='bg-blue-700 text-white font-semibold text-xl hover:bg-blue-600 flex items-center'
          >
            {(isCreateLoading || isEditLoading) && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            {isCreateLoading || isEditLoading ? 'Saving...' : 'Save'}
          </Button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
