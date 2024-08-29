import axiosInstance from "@/lib/api-client"
import { Account } from "@/types/api";
import { z } from "zod"

import { CREATE_ACCOUNT } from "../constants";

const AccountTypeEnum = z.enum(["cash", "chequing", "savings", "credit card", "investments"]);
type AccountTypeEnum = z.infer<typeof AccountTypeEnum>;

export const createAccountInputSchema = z.object({
  name: z.string().min(1, 'Required'),
  type: AccountTypeEnum,
  balance: z.number(),
  description: z.optional(z.string()),
  payment_account_id: z.optional(z.string())
});

export type CreateAccountInput = z.infer<typeof createAccountInputSchema>;

export const createAccount = ({ data }: { data: CreateAccountInput }): Promise<Account> => {
  return axiosInstance.post(CREATE_ACCOUNT, data)
}