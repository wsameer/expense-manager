import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PageLayout } from '@/layouts';
import { Button } from '@/Components/ui/button';
import { ACCOUNTS_ROUTE } from '@/router/routes';
import { AccountOverviewStat } from '@/features/accounts/components/account-overview-stat';

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

  const renderBackButton = () => (
    <Button className='p-0' size="default" variant="link" asChild>
      <Link to={ACCOUNTS_ROUTE}>
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>
    </Button>
  );

  const renderAddButton = () => (
    <Button variant="destructive" asChild>
      <Link to={''}>
        Add
      </Link>
    </Button>
  )

  return (
    <PageLayout headerProps={{
      backButton: renderBackButton(),
      actionButton: renderAddButton(),
    }}>
      <div className="flex justify-between items-center space-x-3">
        {data.map((item) => (
          <AccountOverviewStat key={item.id} {...item} />
        ))}
      </div>
    </PageLayout>
  );
};