import { AllHotels, Hotel } from '@/types';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateHotel = () => {
  const createHotelRequest = async (formData: FormData): Promise<Hotel> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create hotel');
    }

    return response.json();
  };

  const { mutate: createHotel, isLoading } = useMutation(createHotelRequest, {
    onSuccess: async () => {
      toast.success('Hotel Created Successfully');
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  return {
    createHotel,
    isLoading,
  };
};

export const useGetHotels = () => {
  const getHotelsRequest = async (): Promise<AllHotels> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hotels');
    }

    return response.json();
  };

  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery('fetchHotels', getHotelsRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    hotels,
    isLoading,
  };
};
