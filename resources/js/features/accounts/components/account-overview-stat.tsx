import React, { useMemo } from 'react';
import { cn } from '@/utils';
import useSWR from 'swr';
import { ACCOUNTS_STATS_API } from '../constants';
import axiosInstance from '@/lib/api-client';
import { Skeleton } from '@/Components/ui/skeleton';

const CAD = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

type Props = {
  label: string;
  queryKey: string;
};

export const AccountOverviewStat = React.memo(({ label, queryKey }: Props) => {
  const { data, isLoading } = useSWR(
    ACCOUNTS_STATS_API + queryKey,
    async () => {
      const res = await axiosInstance.get(ACCOUNTS_STATS_API, {
        params: { type: queryKey },
      });
      return res.data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const formattedBalance = useMemo(() => {
    if (data?.data?.totalBalance != null) {
      return CAD.format(data.data.totalBalance);
    }
    return '';
  }, [data?.data?.totalBalance]);

  const labelColor = useMemo(() => {
    if (label === 'Liabilities') return 'text-red-700';
    if (label === 'Assets') return 'text-blue-700';
    return '';
  }, [label]);

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
            className={cn('text-sm mt-2 font-medium leading-none', labelColor)}
          >
            {formattedBalance}
          </small>
        </>
      )}
    </div>
  );
});

AccountOverviewStat.displayName = 'AccountOverviewStat';
