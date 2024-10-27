import React, { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFullMonthAndDate } from '../../features/transactions/utils';
import { Button } from '@/Components/ui/button';

type MonthNavigatorProps = {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export const MonthNavigator = memo<MonthNavigatorProps>(
  ({ currentDate, onPrevMonth, onNextMonth }) => {
    return (
      <div className="flex items-center justify-between mb-2">
        <Button
          className="p-0"
          onClick={onPrevMonth}
          variant={'ghost'}
        >
          <ChevronLeft size={20} />
        </Button>
        <p className="text-l font-bold">{getFullMonthAndDate(currentDate)}</p>
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
