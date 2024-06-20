import { useCreateBooking } from '@/api/PaymentApi';
import { Button } from '@/components/ui/button';
import { useSearchContext } from '@/contexts/SearchContext';
import { PaymentIntentResponse, UserTypeObj } from '@/types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

type Props = {
  currentUser: UserTypeObj;
  paymentIntentData: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  hotelId: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  totalCost: number;
  paymentIntentId: string;
};

const BookingForm = ({ currentUser, paymentIntentData }: Props) => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { bookRoom, isLoading } = useCreateBooking();

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      adultCount: search.adultCount,
      childCount: search.childCount,
      hotelId: hotelId,
      totalCost: paymentIntentData.totalCost,
      paymentIntentId: paymentIntentData.paymentIntentId,
    },
  });

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(
      paymentIntentData.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (result.paymentIntent?.status === 'succeeded') {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5'
    >
      <span className='text-3xl font-bold'>Confirm Your Details</span>
      <div className='grid grid-cols-2 gap-6'>
        <label className='text-slate-700 text-sm font-bold flex-1'>
          First Name
          <input
            className='mt-1 rounded w-full py-2 px-3 text-slate-700 bg-slate-200 font-normal'
            type='text'
            readOnly
            disabled
            {...register('firstName')}
          />
        </label>
        <label className='text-slate-700 text-sm font-bold flex-1'>
          Last Name
          <input
            className='mt-1 rounded w-full py-2 px-3 text-slate-700 bg-slate-200 font-normal'
            type='text'
            readOnly
            disabled
            {...register('lastName')}
          />
        </label>
        <label className='text-slate-700 text-sm font-bold flex-1'>
          Email
          <input
            className='mt-1 rounded w-full py-2 px-3 text-slate-700 bg-slate-200 font-normal'
            type='email'
            readOnly
            disabled
            {...register('email')}
          />
        </label>
      </div>
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Your Price Summary</h2>
        <div className='bg-blue-200 p-4 rounded-md'>
          <div className='font-semibold text-lg'>
            Total Cost : Rs {paymentIntentData.totalCost.toFixed(2)}
          </div>
          <div className='text-xs'>Includes taxes and charges</div>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='text-xl font-semibold'>Payment Details</h3>
        <CardElement
          id='payment-element'
          className='border rounded-md p-2 text-sm'
        />
      </div>
      <div className='flex justify-end'>
        <Button
          type='submit'
          disabled={isLoading}
          className='bg-blue-700 text-white font-bold text-xl hover:bg-blue-600 flex items-center'
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isLoading ? 'Saving...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
