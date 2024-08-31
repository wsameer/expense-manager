import { API_BASE_URL } from '@/utils/constants';

export const CREATE_ACCOUNT = API_BASE_URL + '/account';
export const DELETE_ACCOUNT = API_BASE_URL + '/accounts/:id';

export const ACCOUNT_GROUPS = [
  'cash',
  'chequing',
  'savings',
  'credit card',
  'investments',
];
