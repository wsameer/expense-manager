import { useBankAccounts } from '@/features/accounts/hooks/use-bank-account';
import { AccountGroup } from '@/types/api';
import { formattedAmount } from '@/utils';
import React from 'react';

type Props = { title: string; children: React.ReactNode; group?: AccountGroup };

export const ListGroup = React.memo<Props>(({ title, group, children }) => {
  const { getBalanceSumByGroup } = useBankAccounts();
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        <div className="flex justify-between px-4">
          <p className="text-base">{title}</p>
          {group && (
            <p className="text-base text-muted-foreground">
              {formattedAmount(getBalanceSumByGroup(group))}
            </p>
          )}
        </div>
      </h2>
      <div className="bg-white border dark:bg-gray-800 rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
});

ListGroup.displayName = 'ListGroup';
