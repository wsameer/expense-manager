import React from 'react';
import { cn } from '@/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-zinc-200', className)}
      {...props}
    />
  );
}

export { Skeleton };
