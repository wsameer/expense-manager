import React from 'react';
import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { ExpenseCategoryList } from '@/features/expense-category/list';

export const ExpenseCategoryRoute = () => {
  return (
    <PageLayout
      title="Expense Categories"
      showHeaderText={true}
      backButton={{
        url: SETTINGS_ROUTE,
        title: 'Settings',
      }}
    >
      <ExpenseCategoryList />
    </PageLayout>
  );
};
