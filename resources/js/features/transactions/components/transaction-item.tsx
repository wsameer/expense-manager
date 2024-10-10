import { Button } from '@/Components/ui/button';
import { Transaction, TransactionTypes } from '../types';
import { parseDate } from '../utils';
import { cn } from '@/utils';

type TransactionItemProps = {
  transaction: Transaction;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
}) => {
  // console.log("🚀 ~ transaction:", transaction)
  const onClickHandler = () => {
    console.log("Open add transaction drawer in edit mode");
  }

  return (
    <Button className='h-fit w-full' variant="ghost" onClick={onClickHandler} asChild>
      <li className="flex justify-between items-center p-2 border-b">
        <div>
          <p className="text-sm font-semibold">{transaction.note}</p>
          <p className="text-xs text-gray-500">
            {parseDate(transaction.date).toLocaleTimeString('en-CA', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <p
          className={cn('text-xs font-mono font-semibold', {
            'text-green-600': transaction.type === TransactionTypes.INCOME,
            'text-red-600': transaction.type === TransactionTypes.EXPENSE
          })}
        >
          ${Math.abs(transaction.amount).toFixed(2)}
        </p>
      </li>
    </Button>
  )
}
