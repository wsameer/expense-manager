import React from 'react';
import { PageLayout } from '@/layouts';
import { AccountsPage } from '@/features/accounts';

export const AccountsRoute = () => {
  return (
    <PageLayout
      title="Accounts"
      subTitle="Your accounts with its latest balance"
    >
      <AccountsPage />
    </PageLayout>
  );
};
