import React, { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFullMonthAndDate } from '../utils';

type MonthNavigatorProps = {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export const MonthNavigator = memo<MonthNavigatorProps>(
  ({ currentDate, onPrevMonth, onNextMonth }) => {
    return (
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onPrevMonth}
          className="p-2"
        >
          <ChevronLeft size={24} />
        </button>
        <p className="text-l font-bold">{getFullMonthAndDate(currentDate)}</p>
        <button
          onClick={onNextMonth}
          className="p-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  },
);
