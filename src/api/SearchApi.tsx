import { HotelSearchResponse } from '@/types';
import { useQuery } from 'react-query';

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchHotels = (searchParams: SearchParams) => {
  const createSearchRequest = async (): Promise<HotelSearchResponse> => {
    const params = new URLSearchParams();

    params.append('destination', searchParams.destination || '');
    params.append('checkIn', searchParams.checkIn || '');
    params.append('checkOut', searchParams.checkOut || '');
    params.append('adultCount', searchParams.adultCount || '');
    params.append('childCount', searchParams.childCount || '');
    params.append('page', searchParams.page || '');

    params.append('maxPrice', searchParams.maxPrice || '');
    params.append('sortOption', searchParams.sortOption || '');

    searchParams.facilities?.forEach((facility) =>
      params.append('facilities', facility)
    );
    searchParams.types?.forEach((type) => params.append('types', type));
    searchParams.stars?.forEach((star) => params.append('stars', star));

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${params}`);

    if (!response.ok) {
      throw new Error('Failed to fetch hotels');
    }

    return response.json();
  };

  const { data: hotelData, isLoading } = useQuery(
    ['searchHotels', searchParams],
    createSearchRequest,
    {
      retry: false,
    }
  );

  return {
    hotelData,
    isLoading,
  };
};
