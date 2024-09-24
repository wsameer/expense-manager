import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { ExpenseCategoryList } from '@/features/expense-category/list';

export const ExpenseCategoryRoute = () => {

  return (
    <PageLayout
      title="Expense Categories"
      showHeader={true}
      backUrl={SETTINGS_ROUTE}
    >
      <ExpenseCategoryList />
    </PageLayout>
  );
};
