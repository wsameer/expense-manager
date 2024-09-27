import React from 'react';
import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { IncomeCategoryList } from '@/features/income-category/list';

export const IncomeCategoryRoute = () => {
  return (
    <PageLayout
      title="Income Categories"
      showHeader={true}
      backUrl={SETTINGS_ROUTE}
    >
      <IncomeCategoryList />
    </PageLayout>
  );
};
