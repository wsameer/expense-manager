import axiosInstance from '@/lib/api-client';
import { Account } from '@/types/api';
import { z } from 'zod';

import { CREATE_ACCOUNT, DELETE_ACCOUNT } from '../constants';

const AccountGroupEnum = z.enum([
  'cash',
  'chequing',
  'savings',
  'credit card',
  'investments',
]);
type AccountGroupEnum = z.infer<typeof AccountGroupEnum>;

export const CreateAccountFormSchema = z.object({
  name: z
    .coerce
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(48, { message: 'Must be 48 or fewer characters long' }),
  group: AccountGroupEnum,
  balance: z.number().int().nonnegative(),
  description: z.optional(z.string().max(148, { message: 'Must be 148 or fewer characters long' })),
  payment_account_id: z.optional(z.number()),
});

export type CreateAccountForm = z.infer<typeof CreateAccountFormSchema>;

export const createAccount = ({
  data,
}: {
  data: CreateAccountForm;
}): Promise<Account> => {
  return axiosInstance.post(CREATE_ACCOUNT, data);
};

// export const deleteAccount = () => {
//   return axiosInstance.delete(DELETE_ACCOUNT)
// }