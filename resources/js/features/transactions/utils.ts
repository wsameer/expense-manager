import { Transaction } from './types';

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const groupTransactionsByDate = (
  transactions: Transaction[],
): Record<string, Transaction[]> => {
  return transactions.reduce(
    (acc, transaction) => {
      const date = parseDate(transaction.date);
      const dateKey = date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>,
  );
};
