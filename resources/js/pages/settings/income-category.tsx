import React from 'react';
import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { IncomeCategoryList } from '@/features/income-category/list';

export const IncomeCategoryRoute = () => {
  return (
    <PageLayout
      title="Income Categories"
      showHeaderText={true}
      backButton={{
        url: SETTINGS_ROUTE,
        title: 'Settings',
      }}
    >
      <IncomeCategoryList />
    </PageLayout>
  );
};
