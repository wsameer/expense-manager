import useSWRMutation from 'swr/mutation';

import axiosInstance from '@/lib/api-client';
import { handleError } from '@/lib/handle-error';
import { useSWRConfig } from 'swr';
import { CreateTransactionPayload, TRANSACTIONS_API } from '../types';

const createTransactionFetcher = async (
  url: string,
  { arg }: { arg: CreateTransactionPayload },
): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(url, arg);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const useCreateTransaction = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating, error } = useSWRMutation(
    TRANSACTIONS_API,
    createTransactionFetcher,
  );

  const createTransaction = async (
    transactionData: CreateTransactionPayload,
  ) => {
    try {
      const result = await trigger(transactionData);
      mutate(
        TRANSACTIONS_API,
        (currentTransactions: any = []) => [...currentTransactions, result],
        false,
      );
      return result;
    } catch (error) {
      console.error('Failed to create a transaction:', error);
      throw error;
    }
  };

  return { createTransaction, isCreating: isMutating, error };
};
