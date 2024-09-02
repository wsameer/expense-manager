import { useState } from 'react';
import { ACCOUNTS_API } from '../constants';
import { Account } from '@/types/api';
import { CreateAccountForm } from '../types';
import useSWR from 'swr';
import axiosInstance from '@/lib/api-client';

export const useBankAccounts = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch list of bank accounts
  const {
    data: allAccounts,
    error: accountsError,
    mutate: mutateAccounts,
  } = useSWR<Account[]>(ACCOUNTS_API, (url: string) =>
    axiosInstance.get(url).then((res) => res.data),
  );

  // Create a new bank account
  const createAccount = async (
    data: CreateAccountForm,
  ): Promise<Account | null> => {
    setIsCreating(true);

    /**
     * TODO: write an interceptor to do this
     */
    const cleanData = {
      ...data,
      payment_account_id: data.paymentAccountId
    };

    try {
      const response = await axiosInstance.post<Account>(ACCOUNTS_API, cleanData);
      const newAccount = response.data;

      // Update the accounts list in the cache
      await mutateAccounts(
        (currentAccounts) => [...(currentAccounts || []), newAccount],
        false,
      );

      return newAccount;
    } catch (error) {
      console.error('Error creating account:', error);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    allAccounts,
    accountsError,
    createAccount,
    isCreating,
    isUpdating,
  };
};
