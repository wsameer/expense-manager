import React from 'react';
import { PageLayout } from '@/layouts/page-layout';
import { TransactionsPage } from '@/features/transactions';

export const TransactionsRoute = () => {
  return (
    <PageLayout title="Transactions">
      <TransactionsPage />
    </PageLayout>
  );
};
