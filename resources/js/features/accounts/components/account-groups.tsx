import React from 'react';
import { ListGroup } from '@/Components/list-group';
import { ListItem } from '@/Components/list-group/list-item';
import { AccountGroup } from '@/types/api';
import { capitalize, formattedAmount } from '@/utils';
import { Skeleton } from '@/Components/ui/skeleton';
import { ACCOUNT_GROUPS } from '../constants';
import { useBankAccounts } from '../hooks/use-bank-account';
import { AddAccount } from './add-account';
import { AccountGroupEnum } from '../types';
import { useNavigate } from 'react-router-dom';
import { ACCOUNTS_ROUTE } from '@/router/routes';

const displaySkeletonLoader = () => (
  <div>
    <Skeleton className="h-[24px] w-[150px] rounded-xl" />
    <Skeleton className="mt-2 h-[96px] w-full rounded-xl" />
  </div>
);

export const AccountGroups = () => {
  const { allAccounts } = useBankAccounts();
  const navigate = useNavigate();

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
            group={key as unknown as AccountGroup}
            title={capitalize(label)}
          >
            {allAccounts.map(({ id, name, group, balance }) => {
              if (key === group) {
                return (
                  <ListItem
                    key={id}
                    label={name}
                    onClick={() => navigate(`${ACCOUNTS_ROUTE}/${id}`)}
                    rightElement={
                      <p className="text-sm">{formattedAmount(balance)}</p>
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
