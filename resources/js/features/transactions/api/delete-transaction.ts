import axiosInstance from '@/lib/api-client';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import { cache } from 'swr/_internal';
import { handleError } from '@/lib/handle-error';
import { TRANSACTIONS_API } from '../constants';
import { Transaction } from '../types';

const deleteTransactionFetcher = async (
  url: string,
  { arg: id }: { arg: string },
): Promise<void> => {
  try {
    await axiosInstance.delete(`${url}/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

export const useDeleteTransaction = (month: string) => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating, error } = useSWRMutation(
    TRANSACTIONS_API,
    deleteTransactionFetcher,
  );

  const deleteTransaction = async (categoryId: number) => {
    // Store the current categories before deletion
    const currentTransactions = cache.get(
      `${TRANSACTIONS_API}?month=${month}`,
    )?.data;

    try {
      // optimistic update
      mutate(
        `${TRANSACTIONS_API}?month=${month}`,
        (transactions: Transaction[] | undefined) =>
          transactions?.filter((t) => t.id !== categoryId),
        false,
      );

      await trigger(categoryId.toString());
    } catch (error) {
      mutate(`${TRANSACTIONS_API}?month=${month}`, currentTransactions, false);
      console.error('Failed to delete category:', error);
      throw error;
    }
  };

  return { deleteTransaction, isDeleting: isMutating, error };
};
