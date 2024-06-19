import { useSearchHotels } from '@/api/SearchApi';
import FacilitiesFilter from '@/components/FacilitiesFilter';
import HotelTypesFilter from '@/components/HotelTypesFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';
import PriceFilter from '@/components/PriceFilter';
import SearchResultsCard from '@/components/SearchResultsCard';
import StarRatingFilter from '@/components/StarRatingFilter';
import { useSearchContext } from '@/contexts/SearchContext';
import { useState } from 'react';

const Search = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<
    string[]
  >([]);

  const handleStarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value;

    setSelectedStars((prev) =>
      e.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = e.target.value;

    setSelectedHotelTypes((prev) =>
      e.target.checked
        ? [...prev, hotelType]
        : prev.filter((type) => type !== hotelType)
    );
  };

  const handleHotelFacilityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacility = e.target.value;

    setSelectedHotelFacilities((prev) =>
      e.target.checked
        ? [...prev, hotelFacility]
        : prev.filter((facility) => facility !== hotelFacility)
    );
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedHotelFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOption,
  };

  const { hotelData, isLoading } = useSearchHotels(searchParams);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10'>
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
            Filter By :
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedHotelFacilities}
            onChange={handleHotelFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-bold'>
            {hotelData?.data.pagination.total} Hotels Found
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className='p-2 border rounded-md'
          >
            <option value={''}>Sort By</option>
            <option value={'starRating'}>Star Rating</option>
            <option value={'pricePerNightAsc'}>
              Price Per Night (low to high)
            </option>
            <option value={'pricePerNightDesc'}>
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {isLoading ? (
          <div className='flex justify-center items-center p-10'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {hotelData?.data.hotels.map((hotel, i) => (
              <SearchResultsCard key={i} hotel={hotel} />
            ))}
            {hotelData?.data.hotels.length ? (
              <Pagination
                page={hotelData?.data.pagination.page || 1}
                pages={hotelData?.data.pagination.pages || 1}
                onPageChange={(page) => setPage(page)}
              />
            ) : (
              <div className='flex justify-center items-center p-10'>
                No Results Found!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
