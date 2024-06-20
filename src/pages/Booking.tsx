import { useCreatePaymentIntent } from '@/api/PaymentApi';
import { useGetHotelById } from '@/api/SearchApi';
import { useGetCurrentUser } from '@/api/UserApi';
import BookingDetailSummary from '@/components/BookingDetailSummary';
import { useAppContext } from '@/contexts/AppContext';
import { useSearchContext } from '@/contexts/SearchContext';
import BookingForm from '@/forms/BookingForms/BookingForm';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { user } = useGetCurrentUser();
  const search = useSearchContext();
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();
  const { hotel } = useGetHotelById(hotelId as string);

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        search.checkIn < search.checkOut
          ? Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
            (1000 * 60 * 60 * 24)
          : 1;

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { paymentIntentData } = useCreatePaymentIntent(
    hotelId as string,
    numberOfNights.toString()
  );

  if (!hotel || !hotel.data) {
    return <></>;
  }

  return (
    <div className='grid md:grid-cols-[1fr_2fr] gap-6'>
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        hotel={hotel.data}
        numberOfNights={numberOfNights}
      />
      {user?.data && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.data.clientSecret }}
        >
          <BookingForm
            currentUser={user.data}
            paymentIntentData={paymentIntentData.data}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
