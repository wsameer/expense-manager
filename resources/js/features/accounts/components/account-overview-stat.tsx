import React from 'react';
import { cn } from '@/utils';
import useSWR from 'swr';
import { ACCOUNTS_STATS_API } from '../constants';
import axiosInstance from '@/lib/api-client';
import { Skeleton } from '@/Components/ui/skeleton';

type Props = {
  id: number;
  label: string;
  queryKey: string;
};

export const AccountOverviewStat = React.memo(({ label, queryKey }: Props) => {
  const { data, isLoading } = useSWR(ACCOUNTS_STATS_API + queryKey, () =>
    axiosInstance
      .get(ACCOUNTS_STATS_API, { params: { type: queryKey } })
      .then((res) => res.data),
  );

  let CAD = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 border rounded-md h-14 flex flex-col items-center justify-center">
      {isLoading ? (
        <>
          <Skeleton className="h-4 w-16 mb-2 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </>
      ) : (
        <>
          <small className="text-sm font-medium leading-none">{label}</small>
          <small
            className={cn('text-sm mt-2 font-medium leading-none', {
              'text-red-700': label === 'Liabilities',
              'text-blue-700': label === 'Assets',
            })}
          >
            {CAD.format(data.data.total_balance)}
          </small>
        </>
      )}
    </div>
  );
});

AccountOverviewStat.displayName = 'AccountOverviewStat';
