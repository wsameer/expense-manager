import { AxiosError } from 'axios';
import useSWR from 'swr';
import { Category, Subcategory } from '../types';
import { EXPENSE_CATEGORIES_API } from '../constants';
import axiosInstance from '@/lib/api-client';
import { useCallback, useMemo } from 'react';

interface SubcategoryInput {
  name: string;
}

const fetchExpenseSubcategories = async (url: string): Promise<Category[]> => {
  const res = await axiosInstance.get<Category[]>(url);
  return res.data;
};

export const useExpenseSubcategories = (categoryId: number) => {
  const url = `${EXPENSE_CATEGORIES_API}/${categoryId}/subcategories`;

  const { data, error, mutate } = useSWR<Subcategory[], AxiosError>(
    url,
    fetchExpenseSubcategories,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    },
  );

  const createSubcategory = useCallback(
    async (subcategoryData: SubcategoryInput): Promise<Subcategory> => {
      const response = await axiosInstance.post<Subcategory>(
        url,
        subcategoryData,
      );
      await mutate(); // Revalidate the cache
      return response.data;
    },
    [url, mutate],
  );

  const updateSubcategory = useCallback(
    async (
      subcategoryId: number,
      subcategoryData: SubcategoryInput,
    ): Promise<Subcategory> => {
      const response = await axiosInstance.put<Subcategory>(
        `${url}/${subcategoryId}`,
        subcategoryData,
      );
      await mutate(); // Revalidate the cache
      return response.data;
    },
    [url, mutate],
  );

  const deleteSubcategory = useCallback(
    async (subcategoryId: number): Promise<void> => {
      await axiosInstance.delete(`${url}/${subcategoryId}`);
      await mutate(); // Revalidate the cache
    },
    [url, mutate],
  );

  const refetchExpenseSubcategories = useCallback(() => mutate(), [mutate]);

  return useMemo(
    () => ({
      expenseSubcategories: data,
      isLoading: !error && !data,
      isError: error,
      refetchExpenseSubcategories,
      createSubcategory,
      updateSubcategory,
      deleteSubcategory,
    }),
    [
      data,
      error,
      refetchExpenseSubcategories,
      createSubcategory,
      updateSubcategory,
      deleteSubcategory,
    ],
  );
};
