import React from 'react'
import { useTransactions } from '../api/get-transactions';
import { Skeleton } from '@/Components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { groupTransactionsByDate } from '../utils';
import { TransactionItem } from './transaction-item';

export const TransactionList = () => {
  const { t } = useTranslation("transaction");
  const { allTransactions, isError, isLoading } = useTransactions();

  if (isError) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {t('get-error-message')}
        </h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="h-[24px] w-full rounded-xl" />
        <Skeleton className="h-[24px] w-full rounded-xl" />
      </div>
    );
  }

  const groupedTransactions = groupTransactionsByDate(allTransactions!);
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div>
      {sortedDates.map(date => (
        <div key={date} className="mb-4">
          <p className="text-sm mb-2">
            {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
          </p>
          <div className="bg-white rounded-lg shadow">
            {groupedTransactions[date].map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
