import { AxiosError } from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import { ApiResponse, Category } from '../types';
import { EXPENSE_CATEGORIES_API } from '../constants';
import axiosInstance from '@/lib/api-client';
import { useCallback } from 'react';

const fetchExpenseCategories = async (url: string): Promise<Category[]> => {
  const res = await axiosInstance.get<any[]>(url);
  console.log('🚀 ~ fetchExpenseCategories ~ res:', res);
  return res.data;
};

export const useExpenseCategories = () => {
  const { data, error, mutate } = useSWR<Category[], AxiosError>(
    EXPENSE_CATEGORIES_API,
    fetchExpenseCategories,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    },
  );

  const refetchExpenseCategories = useCallback(() => mutate(), [mutate]);

  return {
    expenseCategories: data,
    isLoading: !error && !data,
    isError: error,
    refetchExpenseCategories,
  };
};
