import { useCallback, useEffect, useMemo, useState } from 'react';
import { ACCOUNTS_API } from '../constants';
import { Account, AccountGroup } from '@/types/api';
import { CreateAccountForm } from '../types';
import useSWR from 'swr';
import axiosInstance from '@/lib/api-client';

export const useBankAccounts = () => {
  const [isCreating, setIsCreating] = useState(false);

  // Fetch list of bank accounts
  const {
    data: allAccounts,
    error: accountsError,
    mutate: mutateAccounts,
  } = useSWR<Account[]>(
    ACCOUNTS_API,
    async (url: string) => {
      const res = await axiosInstance.get(url);
      return res.data.map((account: any) => ({
        ...account,
        balance: parseFloat(account.balance),
      }));
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  // Create a new bank account
  const createAccount = useCallback(
    async (data: CreateAccountForm): Promise<any> => {
      setIsCreating(true);
      const cleanData = {
        ...data,
        payment_account_id: data.paymentAccountId,
      };

      try {
        const response = await axiosInstance.post(ACCOUNTS_API, cleanData);
        const newAccount = response.data;
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
    },
    [mutateAccounts],
  );

  const updateAccount = useCallback(
    async (data: CreateAccountForm, accountId: number): Promise<any> => {
      setIsCreating(true);
      const cleanData = {
        ...data,
        payment_account_id: data.paymentAccountId,
      };

      try {
        const response = await axiosInstance.put(
          `${ACCOUNTS_API}/${accountId}`,
          cleanData,
        );
        const updatedAccount = response.data;
        mutateAccounts((prevAccounts) =>
          prevAccounts?.map((account) =>
            account.id === updatedAccount.id ? updatedAccount : account,
          ),
        );
        return updatedAccount;
      } catch (error) {
        console.error('Error updating account:', error);
        return null;
      } finally {
        setIsCreating(false);
      }
    },
    [mutateAccounts],
  );

  const getBalanceSumByGroup = useCallback(
    (group: AccountGroup): number => {
      if (!allAccounts) return 0;
      return allAccounts
        .filter((account) => account.group === group)
        .reduce((sum, account) => sum + account.balance, 0);
    },
    [allAccounts],
  );

  const fetchAccounts = useCallback(() => {
    mutateAccounts();
  }, [mutateAccounts]);

  return useMemo(
    () => ({
      allAccounts,
      accountsError,
      isCreating,
      createAccount,
      updateAccount,
      getBalanceSumByGroup,
      fetchAccounts,
    }),
    [
      allAccounts,
      accountsError,
      isCreating,
      createAccount,
      updateAccount,
      getBalanceSumByGroup,
      fetchAccounts,
    ],
  );
};
