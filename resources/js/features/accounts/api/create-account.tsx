import axiosInstance from '@/lib/api-client';
import { Account } from '@/types/api';
import { z } from 'zod';

import { CREATE_ACCOUNT } from '../constants';

const AccountTypeEnum = z.enum([
  'cash',
  'chequing',
  'savings',
  'credit card',
  'investments',
]);
type AccountTypeEnum = z.infer<typeof AccountTypeEnum>;

export const createAccountFormSchema = z.object({
  name: z.string().min(3, { message: "Must be 3 or more characters long" }).max(48, { message: "Must be 48 or fewer characters long" }),
  type: AccountTypeEnum,
  balance: z.number(),
  description: z.optional(z.string()),
  payment_account_id: z.optional(z.number()),
});

export type CreateAccountForm = z.infer<typeof createAccountFormSchema>;

export const createAccount = ({
  data,
}: {
  data: CreateAccountForm;
}): Promise<Account> => {
  return axiosInstance.post(CREATE_ACCOUNT, data);
};
