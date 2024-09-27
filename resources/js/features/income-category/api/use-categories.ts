import { AxiosError, AxiosResponse } from 'axios';
import useSWR from 'swr';
import { Category } from '../types';
import { INCOME_CATEGORIES_API } from '../constants';
import axiosInstance from '@/lib/api-client';
import { useCallback, useMemo } from 'react';
import { cleanString } from '@/utils';

interface CategoryInput {
  name: string;
  description: string;
}

const fetchIncomeCategories = async (url: string): Promise<Category[]> => {
  const res = await axiosInstance.get<Category[]>(url);
  return res.data;
};

export const useIncomeCategories = () => {
  const { data, error, mutate } = useSWR<Category[], AxiosError>(
    INCOME_CATEGORIES_API,
    fetchIncomeCategories,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    },
  );

  const createCategory = useCallback(
    async (categoryData: CategoryInput): Promise<Category> => {
      const response = await axiosInstance.post<Category>(
        INCOME_CATEGORIES_API,
        categoryData,
      );
      await mutate(); // Revalidate the cache
      return response.data;
    },
    [mutate],
  );

  const updateCategory = useCallback(
    async (
      categoryId: string,
      categoryData: CategoryInput,
    ): Promise<Category> => {
      const response = await axiosInstance.put<Category>(
        `${INCOME_CATEGORIES_API}/${categoryId}`,
        categoryData,
      );
      await mutate(); // Revalidate the cache
      return response.data;
    },
    [mutate],
  );

  const incomeCategoryOptions = useMemo(() => {
    if (!data) return [];

    return data.map((d) => {
      return {
        id: d.id,
        label: d.name,
        value: cleanString(d.name),
      };
    });
  }, []);

  return {
    incomeCategories: data,
    isLoading: !error && !data,
    isError: error,
    incomeCategoryOptions,
    createCategory,
    updateCategory,
  };
};
