import { API_BASE_URL } from '@/utils/constants';

export enum TransactionTypes {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'bank_to_bank',
}

export type TransactionsProps = {
  selectedTab: TransactionTypes;
  setSelectedTab: (value: TransactionTypes) => void;
  setOpen: (value: boolean) => void;
};

export const ACCOUNTS = [
  { label: 'Chequing', value: 'chequing' },
  { label: 'Savings', value: 'savings' },
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'Cash', value: 'cash' },
];

export const TRANSACTIONS_API = API_BASE_URL + 'transactions';

export type FormProps = {
  setOpen: (value: boolean) => void;
};

export type CreateTransactionPayload = {
  type: TransactionTypes;
  date: string;
  amount: number;
  fromAccountId: number;
  toAccountId?: number;
  expenseCategoryId?: number;
  incomeCategoryId?: number;
  expenseSubcategoryId?: number;
  note?: string;
};
