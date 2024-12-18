export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'bank_to_bank',
}

export interface User {
  id?: number;
  name: string;
  email: string;
  updated_at?: string;
}
