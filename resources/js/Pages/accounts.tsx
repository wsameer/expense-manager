import React from 'react';
import { PageLayout } from '@/layouts';
import { AccountOverviewStat } from '@/features/accounts/components/account-overview-stat';
import { AccountGroups } from '@/features/accounts/account-groups';

export const AccountsRoute = () => {
  const statsData = [
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

  return (
    <PageLayout
      title="Accounts"
      subTitle="Your accounts with its latest balance"
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center space-x-3">
          {statsData.map((item) => (
            <AccountOverviewStat
              key={item.id}
              {...item}
            />
          ))}
        </div>
        <AccountGroups />
      </div>
    </PageLayout>
  );
};
