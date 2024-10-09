import { Button } from '@/Components/ui/button';
import { Transaction } from '../types';
import { parseDate } from '../utils';

type TransactionItemProps = {
  transaction: Transaction;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
}) => {
  const onClickHandler = () => {
    console.log("Open add transaction drawer in edit mode");
  }

  return (
    <Button className='h-fit w-full' variant="ghost" onClick={onClickHandler} asChild>
      <li className="flex justify-between items-center p-2 border-b">
        <div>
          <p className="text-sm font-semibold">{transaction.note}</p>
          <p className="text-xs text-gray-500">
            {parseDate(transaction.date).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <p
          className={`text-sm font-mono font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}
        >
          ${Math.abs(transaction.amount).toFixed(2)}
        </p>
      </li>
    </Button>
  )
}
