import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

interface MonthSelectorProps {
  onSelectMonth: (year: number, month: number) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  onSelectMonth,
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handlePreviousYear = () => {
    setSelectedYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    setSelectedYear((prev) => prev + 1);
  };

  const handleMonthClick = (monthIndex: number) => {
    onSelectMonth(selectedYear, monthIndex + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <Button
          className="p-0"
          onClick={handlePreviousYear}
          variant={'ghost'}
        >
          <ChevronLeft size={20} />
        </Button>
        <span className="text-xl font-semibold">{selectedYear}</span>
        <Button
          className="p-0"
          onClick={handleNextYear}
          variant={'ghost'}
        >
          <ChevronRight size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {months.map((month, index) => (
          <Button
            variant="ghost"
            key={month}
            onClick={() => handleMonthClick(index)}
            className={cn(
              'p-2 rounded-lg text-center text-xs transition-colors',
              {
                'bg-red-800 hover:bg-red-900':
                  selectedYear === currentYear && index === currentMonth,
              },
            )}
          >
            {month}
          </Button>
        ))}
      </div>
    </div>
  );
};
