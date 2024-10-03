import React from 'react';
import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { ExpenseCategoryList } from '@/features/expense-category/list';

export const ExpenseCategoryRoute = () => {
  return (
    <PageLayout
      title="Expense Categories"
      showHeader={true}
      backButton={{
        url: SETTINGS_ROUTE,
        title: 'Settings'
      }}
    >
      <ExpenseCategoryList />
    </PageLayout>
  );
};
