import { cn } from '@/utils';
import React from 'react'

type Props = {
  id: number;
  label: string;
  value: number;
};

export const AccountOverviewStat = ({ id, label, value }: Props) => {
  let CAD = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });

  return (
    <div className="flex-1 bg-white border rounded-lg bg-zinc-200 shadow-lg h-14 flex flex-col items-center justify-center">
      {/* <Skeleton className="h-4 w-16 mb-2 rounded-full" /> */}
      {/* <Skeleton className="h-4 w-20 rounded-full" /> */}
      <small className="text-sm font-medium leading-none">{label}</small>
      <small className={cn('text-sm mt-2 font-medium leading-none', {
        'text-red-700': label === 'Liabilities',
        'text-blue-700': label === 'Assets'
      })}>{CAD.format(value)}</small>
    </div >
  );
}
