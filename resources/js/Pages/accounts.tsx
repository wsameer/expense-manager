import React from 'react';
import { PageLayout } from '@/layouts';
import { AccountOverviewStat } from '@/features/accounts/components/account-overview-stat';

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

  const pageTitle = (
    <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
      Accounts
    </h2>
  );

  return (
    <PageLayout
      title="Accounts"
      pageTitle={pageTitle}
    >
      <div className="flex justify-between items-center space-x-3">
        {data.map((item) => (
          <AccountOverviewStat
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </PageLayout>
  );
};
