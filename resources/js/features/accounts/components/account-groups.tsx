import React from 'react';
import { ListGroup } from '@/Components/list-group';
import { ListItem } from '@/Components/list-group/list-item';
import { AccountGroup } from '@/types/api';
import { capitalize, formattedAmount } from '@/utils';
import { Skeleton } from '@/Components/ui/skeleton';
import { ACCOUNT_GROUPS } from '../constants';
import { AddAccount } from './add-account';
import { AccountGroupEnum } from '../types';
import { useNavigate } from 'react-router-dom';
import { ACCOUNTS_ROUTE } from '@/router/routes';
import { useAccounts } from '../api/get-accounts';

const displaySkeletonLoader = () => (
  <div>
    <Skeleton className="h-[24px] w-[150px] rounded-xl" />
    <Skeleton className="mt-2 h-[96px] w-full rounded-xl" />
  </div>
);

export const AccountGroups = () => {
  const { allAccounts, isError, isLoading, getBalanceSumByGroup } =
    useAccounts();
  const navigate = useNavigate();

  if (isError) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Error in getting Accounts. Please try again.
        </h3>
      </div>
    );
  }

  if (isLoading) {
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
        return (
          <ListGroup
            key={id}
            title={capitalize(label)}
            rightSideElement={
              <p className="text-sm text-muted-foreground">
                {formattedAmount(getBalanceSumByGroup(key as AccountGroup))}
              </p>
            }
          >
            {allAccounts?.map(({ id, name, group, balance }) => {
              if (key === group) {
                return (
                  <ListItem
                    key={id}
                    label={name}
                    onClick={() =>
                      navigate(`${ACCOUNTS_ROUTE}/${id}`, {
                        state: {
                          fromAccountsPage: true,
                        },
                      })
                    }
                    rightElement={
                      <p className="text-sm">{formattedAmount(balance)}</p>
                    }
                  />
                );
              }
            })}
            {(key !== 'CASH') && <AddAccount group={key as unknown as AccountGroupEnum} />}
          </ListGroup>
        );
      })}
    </div>
  );
};
