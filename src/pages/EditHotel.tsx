import { useGetMyHotelsById } from '@/api/HotelApi';
import ManageHotelForm from '@/forms/ManageHotelForm/ManageHotelForm';
import { useParams } from 'react-router-dom';

const EditHotel = () => {
  const { hotelId } = useParams();

  const { hotel } = useGetMyHotelsById(hotelId || '');

  return <ManageHotelForm hotel={hotel?.data} isEdit={true} />;
};

export default EditHotel;
