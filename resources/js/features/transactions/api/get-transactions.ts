import { AxiosError } from 'axios';
import { useCallback } from 'react';
import useSWR from 'swr';

import axiosInstance from '@/lib/api-client';
import { TRANSACTIONS_API } from '../constants';
import { Transaction } from '../types';

const fetchTransactions = async (url: string): Promise<Transaction[]> => {
  const res = await axiosInstance.get<any[]>(url);
  return res.data.map((account) => ({
    ...account,
    balance: parseFloat(account.balance),
  }));
};

export const useTransactions = () => {
  const { data, error, mutate } = useSWR<Transaction[], AxiosError>(
    TRANSACTIONS_API,
    fetchTransactions,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    },
  );

  const refetchTransactions = useCallback(() => mutate(), [mutate]);

  return {
    allTransactions: data,
    isLoading: !error && !data,
    isError: error,
    refetchTransactions,
  };
};
