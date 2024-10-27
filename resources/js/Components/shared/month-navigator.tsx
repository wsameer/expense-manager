import React, { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/Components/ui/popover';
import { Button } from '@/Components/ui/button';

import { getFullMonthAndDate } from '../../features/transactions/utils';
import { MonthSelector } from './month-selector';

type MonthNavigatorProps = {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  options?: {
    timeJump?: boolean;
  };
};

export const MonthNavigator = memo<MonthNavigatorProps>(
  ({ currentDate, onPrevMonth, onNextMonth, options }) => {
    const handleMonthSelect = (year: number, month: number) => {
      console.log(year, month);
    };

    return (
      <div className="flex items-center justify-between mb-2">
        <Button
          className="p-0"
          onClick={onPrevMonth}
          variant={'ghost'}
        >
          <ChevronLeft size={20} />
        </Button>
        {options?.timeJump ? (
          <Popover>
            <PopoverTrigger className="font-bold">
              {getFullMonthAndDate(currentDate)}
            </PopoverTrigger>
            <PopoverContent>
              <MonthSelector onSelectMonth={handleMonthSelect} />
            </PopoverContent>
          </Popover>
        ) : (
          <p className="text-l font-bold">{getFullMonthAndDate(currentDate)}</p>
        )}
        <Button
          className="p-0"
          onClick={onNextMonth}
          variant={'ghost'}
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    );
  },
);
