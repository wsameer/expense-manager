import React, { useState } from 'react';
import { MonthNavigator } from '@/Components/shared/month-navigator';
import { TransactionList } from './components/transactions-list';

export const TransactionsPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month));
  };

  return (
    <div className="mb-4">
      <MonthNavigator
        currentDate={currentDate}
        handleMonthChange={handleMonthChange}
      />
      <TransactionList currentDate={currentDate} />
    </div>
  );
};
