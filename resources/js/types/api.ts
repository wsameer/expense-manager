export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export enum AccountGroup {
  CASH = 'cash',
  CHEQUING = 'chequing',
  CREDIT_CARD = 'credit card',
  SAVINGS = 'savings',
  INVESTMENTS = 'investments',
}

export type Account = Entity<{
  name: string;
  group: typeof AccountGroup;
  balance: number;
  description: string;
  payment_account_id: number | null;
  id: number;
  user_id: number;
  updated_at: string; // date time
  created_at: string; // date time
}>;
