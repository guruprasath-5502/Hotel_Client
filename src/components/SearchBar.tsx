import { useSearchContext } from '@/contexts/SearchContext';
import { FormEvent, useState } from 'react';
import { MdTravelExplore } from 'react-icons/md';
import { DatePicker } from './DatePicker';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const search = useSearchContext();

  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate('/search');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='-mt-8 p-3 bg-orange-500 rounded shadow-md flex flex-col lg:flex-row items-center gap-4'
    >
      <div className='flex flex-row items-center flex-1 bg-white p-2 rounded w-full'>
        <MdTravelExplore size={25} className='mr-2' />
        <input
          placeholder='Where are you going?'
          className='w-full text-base focus:outline-none'
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className='flex bg-white px-2 py-1 gap-2 rounded flex-1 w-full'>
        <label className='items-center flex flex-1'>
          Adults :{' '}
          <input
            className='w-full p-1 focus:outline-none font-bold flex-1'
            type='number'
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className='items-center flex flex-1'>
          Children :{' '}
          <input
            className='w-full p-1 focus:outline-none font-bold flex-1'
            type='number'
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className='h-full flex-1 w-full'>
        <DatePicker
          checkIn={checkIn}
          checkOut={checkOut}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
        />
      </div>
      <div className='flex h-full flex-1 gap-4 w-full'>
        <Button className='w-2/3 bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 flex-1'>
          Search
        </Button>
        <Button className='w-1/3 bg-red-600 text-white h-full p-2 font-bold hover:bg-red-500 flex-1'>
          Clear
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
