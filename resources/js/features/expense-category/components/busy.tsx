import React, { memo } from 'react';
import { Skeleton } from '@/Components/ui/skeleton';

export const Busy = memo(() => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
      <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
      <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
      <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
      <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
      <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
      <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
      <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
    </div>
  );
});

Busy.displayName = 'Busy';
