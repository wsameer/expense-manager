import { AccountGroup } from '@/types/api';
import { z } from 'zod';

const AccountGroupEnum = z.enum([
  'CASH',
  'CHEQUING',
  'CREDIT_CARD',
  'SAVINGS',
  'INVESTMENTS',
]);
export type AccountGroupEnum = z.infer<typeof AccountGroupEnum>;

export const CreateAccountFormSchema = z.object({
  name: z.coerce
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(48, { message: 'Must be 48 or fewer characters long' }),
  group: AccountGroupEnum,
  balance: z.coerce.number().nonnegative(),
  description: z.optional(
    z.string().max(148, { message: 'Must be 148 or fewer characters long' }),
  ),
  payment_account_id: z.optional(z.number()),
});

export type CreateAccountForm = z.infer<typeof CreateAccountFormSchema>;
