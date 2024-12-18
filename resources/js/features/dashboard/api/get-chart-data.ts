import { AxiosError } from 'axios';
import { useCallback } from 'react';
import useSWR from 'swr';

import axiosInstance from '@/lib/api-client';
import { EXPENSE_TOTALS_API, INCOME_TOTALS_API } from '../constants';
import { PieChartData } from '../types';
import { TransactionType } from '@/types';

const fetchChartData = async (url: string): Promise<any> => {
  const res = await axiosInstance.get<PieChartData[]>(url);
  const sortedCategories = res.data.sort(
    (a, b) => b.totalAmount - a.totalAmount,
  );
  return sortedCategories;
};

/**
 * @param month // YY-MM
 */
export const useChartData = (month: string, type: TransactionType) => {
  const apiUrl =
    type === 'expense'
      ? `${EXPENSE_TOTALS_API}?month=${month}`
      : `${INCOME_TOTALS_API}?month=${month}`;

  const { data, error, mutate } = useSWR<PieChartData[], AxiosError>(
    apiUrl,
    fetchChartData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    },
  );

  const refetchPieChart = useCallback(() => mutate(), [mutate]);

  return {
    pieChartData: data,
    isLoading: !error && !data,
    isError: error,
    refetchPieChart,
  };
};
