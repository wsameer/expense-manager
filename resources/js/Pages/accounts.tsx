import React from 'react';
import { PageLayout } from '@/layouts';

type Props = {
  id: number;
  label: string;
  value: number;
};

const AccountOverviewStat = ({ id, label, value }: Props) => {
  let CAD = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
  return (
    <div className="flex-1 bg-white border rounded-lg border-gray-300 shadow-lg h-16 flex flex-col items-center justify-center">
      <p className="">{label}</p>
      < p className="" > {CAD.format(value)}</p >
    </div >
  );
};

export const AccountsRoute = () => {
  const data = [
    {
      id: 1,
      value: 1000,
      label: 'Assets'
    },
    {
      id: 2,
      value: 1000,
      label: 'Liabilities'
    },
    {
      id: 3,
      value: 100.01,
      label: 'Total'
    }
  ];

  return (
    <PageLayout>
      <div className="flex justify-between items-center space-x-3">
        {data.map((item) => (
          <AccountOverviewStat key={item.id} {...item} />
        ))}
      </div>
      <p>A table displaying category wise your bank accounts and the total balance left</p>
    </PageLayout>
  );
};