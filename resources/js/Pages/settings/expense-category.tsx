import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { ExpenseCategoryList } from '@/features/expense-category/list';
import { AddExpenseCategory } from '@/features/expense-category/components/add-expense-category';
import { Category } from '@/features/expense-category/types';

export const ExpenseCategoryRoute = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | undefined>();

  const handleEditExpenseCategory = (category: Category) => {
    setCategoryToEdit(category);
    setOpenEditModal(true)
  }

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
      <ExpenseCategoryList handleEditExpenseCategory={handleEditExpenseCategory} />

      <AddExpenseCategory
        onOpenChange={setOpenEditModal}
        open={openEditModal}
        editMode={categoryToEdit}
      />
    </PageLayout>
  );
};
