import React from 'react';
import { AccountOverviewStat } from './components/account-overview-stat';
import { AccountGroups } from './components/account-groups';

export const AccountsPage = () => {
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
