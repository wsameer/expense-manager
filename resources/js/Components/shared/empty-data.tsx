import React from 'react';
import { Ghost } from 'lucide-react';

export const EmptyTransactions = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-40 text-center">
      <Ghost
        className="text-muted-foreground"
        size={32}
      />
      <p className="text-muted-foreground">No data available</p>
    </div>
  );
};
