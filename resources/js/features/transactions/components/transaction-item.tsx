import { Button } from '@/Components/ui/button';
import { Transaction, TransactionTypes } from '../types';
import { parseDate } from '../utils';
import { cn } from '@/utils';
import { useCallback } from 'react';

type TransactionItemProps = {
  transaction: Transaction;
};


export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
}) => {

  const onClickHandler = () => {
    console.log("Open add transaction drawer in edit mode");
  }

  const getCategory = useCallback(() => {
    if (transaction.type === TransactionTypes.EXPENSE && transaction.expenseCategory) {
      return transaction.expenseCategory.name;
    }

    if (transaction.type === TransactionTypes.INCOME && transaction.incomeCategory) {
      return transaction.incomeCategory.name;
    }

    if (transaction.type === TransactionTypes.TRANSFER) {
      return 'Transfer';
    }
  }, [transaction])


  return (
    <Button className='h-fit w-full px-2' variant="ghost" onClick={onClickHandler} asChild>
      <li className='grid grid-cols-10 gap-2 items-center w-full border-b border-gray-200 text-sm'>
        <div className="col-span-2">
          <p className="text-xs text-gray-900 text-ellipsis overflow-hidden">{getCategory()}</p>
        </div>
        <div className="col-span-6">
          <p className="text-xs text-gray-600">{transaction.note}</p>
          <p className="text-xs text-gray-400" style={{ fontSize: '11px' }}>
            {transaction.fromAccount.name}
          </p>
        </div>
        <div className="col-span-2 text-right">
          <p className={cn("text-xs", {
            'text-green-600': transaction.type === TransactionTypes.INCOME,
            'text-red-600': transaction.type === TransactionTypes.EXPENSE
          })}>
            ${Math.abs(transaction.amount).toFixed(2)}
          </p>
        </div>
      </li>
    </Button>
  )
}
