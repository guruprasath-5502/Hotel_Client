import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type DatePickerProps = {
  checkIn: Date;
  checkOut: Date;
  setCheckIn: React.Dispatch<React.SetStateAction<Date>>;
  setCheckOut: React.Dispatch<React.SetStateAction<Date>>;
};

export function DatePicker({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}: DatePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: checkIn,
    to: checkOut,
  });

  const handleDateChange = (date: DateRange | undefined) => {
    if (date?.from && date.to) {
      setCheckIn(date.from);
      setCheckOut(date.to);
      setDate(date);
    }
  };

  return (
    <div className={cn('flex')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            fromDate={new Date()}
            defaultMonth={new Date()}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
