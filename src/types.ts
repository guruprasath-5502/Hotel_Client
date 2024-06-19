export type Hotel = {
  status: boolean;
  data: HotelObj;
};

export type HotelObj = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: string;
  flgUseStatus: number;
};

export type AllHotels = {
  status: boolean;
  data: HotelObj[];
};

export type HotelSearchResponse = {
  status: boolean;
  data: HotelSearchResponseObj;
};

type HotelSearchResponseObj = {
  hotels: HotelObj[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
