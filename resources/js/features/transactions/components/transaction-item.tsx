import { Button } from '@/Components/ui/button';
import { Transaction, TransactionTypes } from '../types';
import { parseDate } from '../utils';
import { cn } from '@/utils';
import { useCallback } from 'react';

type TransactionItemProps = {
  transaction: Transaction;
  onTransactionClick: (transaction: Transaction) => void;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onTransactionClick,
}) => {
  const getCategory = useCallback(() => {
    if (
      transaction.type === TransactionTypes.EXPENSE &&
      transaction.expenseCategory
    ) {
      return transaction.expenseCategory.name;
    }

    if (
      transaction.type === TransactionTypes.INCOME &&
      transaction.incomeCategory
    ) {
      return transaction.incomeCategory.name;
    }

    if (transaction.type === TransactionTypes.TRANSFER) {
      return 'Transfer';
    }
  }, [transaction]);

  const getSubcategory = useCallback(() => {
    if (
      transaction.type === TransactionTypes.EXPENSE &&
      transaction.expenseSubcategory
    ) {
      return transaction.expenseSubcategory.name;
    }
  }, [transaction]);

  return (
    <Button
      className="flex h-10 items-center justify-between py-1 px-2 bg-white dark:bg-zinc-800 dark:hover:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-900 cursor-pointer first:border-t-0"
      onClick={() => onTransactionClick(transaction)}
      variant="ghost"
      asChild
    >
      <li className="grid grid-cols-10">
        <div className="flex flex-col col-span-2">
          <p className="text-xs text-zinc-900 dark:text-zinc-200 text-ellipsis overflow-hidden">
            {getCategory()}
          </p>
          <p className="text-xs text-zinc-900 dark:text-zinc-200 text-ellipsis overflow-hidden">
            {getSubcategory()}
          </p>
        </div>
        <div className="col-span-6 text-ellipsis overflow-hidden px-1">
          <p className="text-xs text-zinc-600 dark:text-white">
            {transaction.note}
          </p>
          <p
            className="text-xs text-zinc-400"
            style={{ fontSize: '11px' }}
          >
            {transaction.fromAccount.name}
          </p>
        </div>
        <div className="col-span-2 text-right">
          <p
            className={cn('text-xs', {
              'text-green-600': transaction.type === TransactionTypes.INCOME,
              'text-red-600': transaction.type === TransactionTypes.EXPENSE,
            })}
          >
            ${Math.abs(transaction.amount).toFixed(2)}
          </p>
        </div>
      </li>
    </Button>
  );
};
