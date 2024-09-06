import React from 'react';
import { AccountOverviewStat } from './components/account-overview-stat';
import { AccountGroups } from './components/account-groups';

export const AccountsPage = () => {
  const statsData = [
    {
      id: 1,
      label: 'Assets',
      queryKey: 'asset',
    },
    {
      id: 2,
      label: 'Liabilities',
      queryKey: 'debt',
    },
    {
      id: 3,
      queryKey: 'debt',
      label: 'Total',
    },
  ];

  return (
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
  );
};
