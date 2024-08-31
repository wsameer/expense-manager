import React from 'react';
import { PageLayout } from '@/layouts';
import { AccountOverviewStat } from '@/features/accounts/components/account-overview-stat';
import { ListGroup } from '@/Components/list-group';
import { ListItem } from '@/Components/list-group/list-item';
import { AddAccount } from '@/features/accounts/add-account';
import { AccountType } from '@/types/api';

export const AccountsRoute = () => {
  const data = [
    {
      id: 1,
      value: 1000,
      label: 'Assets',
    },
    {
      id: 2,
      value: 1000,
      label: 'Liabilities',
    },
    {
      id: 3,
      value: 100.01,
      label: 'Total',
    },
  ];

  const TotalBalance = (
    <p className="text-sm">
      $14,000.00
    </p>
  )

  return (
    <PageLayout
      title="Accounts"
      subTitle="Your accounts with its latest balance"
    >
      <div className='grid grid-cols-1 gap-6'>
        <div className="flex justify-between items-center space-x-3">
          {data.map((item) => (
            <AccountOverviewStat
              key={item.id}
              {...item}
            />
          ))}
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <ListGroup title={'Cash'}>
            <ListItem label={'Cash'} rightElement={TotalBalance} />
            <AddAccount type={AccountType.CASH} />
          </ListGroup>

          <ListGroup title="Chequing">
            <ListItem label="TD Unlimited Chequing" rightElement={TotalBalance} />
            <ListItem label="Wealth Simple Cash" rightElement={TotalBalance} />
            <ListItem label="Neo Financial Money" rightElement={TotalBalance} />
            <ListItem label="Simplii Financial" rightElement={TotalBalance} />
            <AddAccount type={AccountType.CHEQUING} />
          </ListGroup>
        </div>
      </div>
    </PageLayout>
  );
};
