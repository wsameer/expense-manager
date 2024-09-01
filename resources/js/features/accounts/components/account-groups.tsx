import React from 'react';
import { ListGroup } from '@/Components/list-group';
import { ListItem } from '@/Components/list-group/list-item';
import { Account } from '@/types/api';
import { capitalize } from '@/utils';
import { Skeleton } from '@/Components/ui/skeleton';
import { ACCOUNT_GROUPS } from '../constants';
import { useBankAccounts } from '../hooks/use-bank-account';
import { AddAccount } from './add-account';
import { AccountGroupEnum } from '../types';

const displaySkeletonLoader = () => (
  <div>
    <Skeleton className="h-[24px] w-[150px] rounded-xl" />
    <Skeleton className="mt-2 h-[96px] w-full rounded-xl" />
  </div>
);

export const AccountGroups = () => {
  const { allAccounts } = useBankAccounts();

  if (!allAccounts) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {displaySkeletonLoader()}
        {displaySkeletonLoader()}
        {displaySkeletonLoader()}
        {displaySkeletonLoader()}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {ACCOUNT_GROUPS.map(({ id, label, key }) => {
        /** Cash accounts are hidden for now */
        if (key === 'CASH') return null;

        return (
          <ListGroup
            key={id}
            title={capitalize(label)}
          >
            {allAccounts.map((account: Account) => {
              if (key === account.group) {
                return (
                  <ListItem
                    key={account.id}
                    label={account.name}
                    rightElement={
                      <p className="text-sm">{`$${account.balance}`}</p>
                    }
                  />
                );
              }
            })}
            <AddAccount group={key as unknown as AccountGroupEnum} />
          </ListGroup>
        );
      })}
    </div>
  );
};
