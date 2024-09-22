import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { ExpenseCategoryList } from '@/features/expense-category/list';
import { useExpenseCategories } from '@/features/expense-category/api/use-expense-categories';
import { AddExpenseCategory } from '@/features/expense-category/components/add-expense-category';

export const ExpenseCategoryRoute = () => {
  const { refetchExpenseCategories } = useExpenseCategories();
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <PageLayout
      title="Expense Categories"
      showHeader={true}
      backUrl={SETTINGS_ROUTE}
      rightElement={
        <div className="d-flex">
          <Button onClick={() => setOpenEditModal(true)}>Add</Button>
        </div>
      }
    >
      <ExpenseCategoryList />

      <AddExpenseCategory
        onCategoryAdded={refetchExpenseCategories}
        onOpenChange={setOpenEditModal}
        open={openEditModal}
      />
    </PageLayout>
  );
};
