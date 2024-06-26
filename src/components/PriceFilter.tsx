type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='font-semibold mb-2'>Max Price</h4>
      <select
        className='p-2 border rounded-md w-full'
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value={''}>Select Max Price</option>
        {['500', '1000', '1500', '2000', '3000', '5000'].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
