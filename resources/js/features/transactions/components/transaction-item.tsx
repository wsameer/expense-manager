import { Transaction } from "../types";
import { parseDate } from "../utils";

type TransactionItemProps = {
  transaction: Transaction;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => (
  <div className="flex justify-between items-center p-2 border-b">
    <div>
      <p className="font-semibold">{transaction.note}</p>
      <p className="text-sm text-gray-500">
        {parseDate(transaction.date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
    <p className={`font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      ${Math.abs(transaction.amount).toFixed(2)}
    </p>
  </div>
);