import { Account } from '@/types/api';
import { Category } from '../expense-category/types';
import { IncomeCategory } from '../income-category/types';

export enum TransactionTypes {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'bank_to_bank',
}

export const ACCOUNTS = [
  { label: 'Chequing', value: 'chequing' },
  { label: 'Savings', value: 'savings' },
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'Cash', value: 'cash' },
];

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

export interface Transaction {
  id: number;
  user_id: number;
  type: TransactionTypes;
  date: string;
  amount: number;
  from_account_id: number;
  to_account_id: number | null;
  expense_category_id: number | null;
  expense_subcategory_id: number | null;
  income_category_id: number | null;
  note: string | null;
  created_at: string;
  updated_at: string;
  from_account: Account;
  to_account: Account | null;
  expense_category: Category | null;
  expense_subcategory: Category | null;
  income_category: IncomeCategory | null;
}
