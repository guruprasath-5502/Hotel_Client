import { Button } from './ui/button';

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center'>
      <ul className='flex gap-2'>
        {pageNumbers.map((number, i) => (
          <li key={i}>
            <Button
              className={`text-white text-lg hover:bg-blue-600 ${
                page === number ? 'bg-blue-700' : ' bg-blue-400'
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
