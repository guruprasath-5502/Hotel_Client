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
  bookings: BookingType[];
  flgUseStatus: number;
};

export type BookingType = {
  _id: string;
  userId: string;
  firstname: string;
  lastname: string;
  adultConut: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type AllHotels = {
  status: boolean;
  data: HotelObj[];
};

export type HotelSearchResponse = {
  status: boolean;
  data: HotelSearchResponseObj;
};

export type HotelSearchResponseObj = {
  hotels: HotelObj[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type UserType = {
  status: boolean;
  data: UserTypeObj;
};

export type UserTypeObj = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  flgUseStatus: number;
  verified: boolean;
};

export type PaymentIntentType = {
  status: boolean;
  data: PaymentIntentResponse;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
