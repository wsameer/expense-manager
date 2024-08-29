import React from 'react';
import { PageLayout } from '@/layouts/page-layout';
import { Head } from '@/Components/seo';

export const TransactionsRoute = () => {
  const pageTitle = (
    <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
      Transactions
    </h2>
  );

  return (
    <PageLayout
      title="Transactions"
      pageTitle={pageTitle}
    >
    </PageLayout>
  );
};
