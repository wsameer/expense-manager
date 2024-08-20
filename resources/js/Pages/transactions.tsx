import React from 'react';
import { PageLayout } from '@/layouts/page-layout';
import { Head } from '@/Components/seo';

export const TransactionsRoute = () => {
  return (
    <PageLayout>
      <Head title='Transactions' />
      <p>TransactionsRoute</p>
      <p>List of all transactions</p>
    </PageLayout>
  );
};
