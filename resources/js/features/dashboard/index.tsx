import { useState } from 'react';
import { MonthNavigator } from '@/Components/shared/month-navigator';

export const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month));
  };

  return (
    <div className="mb-4">
      <MonthNavigator
        currentDate={currentDate}
        handleMonthChange={handleMonthChange}
        options={{ timeJump: true }}
      />
    </div>
  );
};
