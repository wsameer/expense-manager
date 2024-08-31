import { API_BASE_URL } from '@/utils/constants';

export const CREATE_ACCOUNT = API_BASE_URL + 'account';
export const DELETE_ACCOUNT = API_BASE_URL + 'accounts/:id';
export const GET_All_ACCOUNTS_API = API_BASE_URL + 'accounts';

export const ACCOUNT_GROUPS = [
  { key: 'CASH', label: 'cash', id: 1 },
  { key: 'CHEQUING', label: 'chequing', id: 2 },
  { key: 'SAVINGS', label: 'savings', id: 3 },
  { key: 'CREDIT_CARD', label: 'credit card', id: 4 },
  { key: 'INVESTMENTS', label: 'investments', id: 5 },
];
