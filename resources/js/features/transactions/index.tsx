import React, { useState } from 'react';
import { MonthNavigator } from './components/month-navigator';
import { TransactionList } from './components/transactions-list';

export const TransactionsPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  };

  return (
    <div className="mb-4">
      <MonthNavigator
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <TransactionList currentDate={currentDate} />
    </div>
  );
};
