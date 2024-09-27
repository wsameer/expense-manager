export enum TransactionTypes {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
}

export type TransactionsProps = {
  selectedTab: TransactionTypes;
  setSelectedTab: (value: TransactionTypes) => void;
};

/**
 * @deprecated Get the data from API call
 */
export const CATEGORIES = [
  { label: 'Food', value: 'food' },
  { label: 'Groceries', value: 'groceries' },
  { label: 'Housing', value: 'housing' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Utilities', value: 'utilities' },
  { label: 'Travel', value: 'travel' },
  { label: 'Furniture', value: 'furniture' },
  { label: 'Other', value: 'other' },
] as const;

export const ACCOUNTS = [
  { label: 'Chequing', value: 'chequing' },
  { label: 'Savings', value: 'savings' },
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'Cash', value: 'cash' },
];
