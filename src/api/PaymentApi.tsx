import { BookingFormData } from '@/forms/BookingForms/BookingForm';
import { PaymentIntentType } from '@/types';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreatePaymentIntent = (
  hotelId: string,
  numberOfNights: string
): { paymentIntentData: PaymentIntentType | undefined; isLoading: boolean } => {
  const createPaymentIntentRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ numberOfNights }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create Intent`);
    }

    return response.json();
  };

  const { data: paymentIntentData, isLoading } = useQuery(
    'createPaymenyIntent',
    createPaymentIntentRequest,
    {
      enabled: !!hotelId && parseInt(numberOfNights) > 0,
      retry: false,
    }
  );

  return {
    paymentIntentData,
    isLoading,
  };
};

export const useCreateBooking = () => {
  const navigate = useNavigate();
  const createBooking = async (formData: BookingFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create Booking`);
    }

    return response.json();
  };

  const { mutate: bookRoom, isLoading } = useMutation(createBooking, {
    onSuccess: () => {
      toast.success('Room booked Successfully');
      navigate('/my-bookings');
    },
    onError: () => {
      toast.error('Failed to book room');
    },
  });

  return {
    bookRoom,
    isLoading,
  };
};
