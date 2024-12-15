import { useState } from 'react';
import { MonthNavigator } from '@/Components/shared/month-navigator';
import { ChartContainer } from './components/chart-container';
import { useResponsive } from '@/hooks';
import { cn } from '@/utils';

export const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isDesktop } = useResponsive();

  const handleMonthChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month));
  };

  return (
    <div
      className={cn('grid grid-cols-1 gap-6', {
        'w-1/3': isDesktop,
      })}
    >
      <MonthNavigator
        currentDate={currentDate}
        handleMonthChange={handleMonthChange}
        options={{ timeJump: true }}
      />
      <ChartContainer currentDate={currentDate} />
    </div>
  );
};
