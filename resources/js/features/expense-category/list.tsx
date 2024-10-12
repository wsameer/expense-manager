import React, { useState } from 'react';
import { useExpenseCategories } from './api/use-expense-categories';
import { Button } from '@/Components/ui/button';
import {
  ChevronDown,
  MoreVertical,
  Pencil,
  Plus,
  PlusCircle,
  Trash2,
} from 'lucide-react';

import { Collapsible, CollapsibleTrigger } from '@/Components/ui/collapsible';
import { CollapsibleContent } from '@radix-ui/react-collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Busy } from '@/Components/shared/busy';
import { useTranslation } from 'react-i18next';
import { useConfirmDialog } from '@/Components/ui/confirmable';
import { toast } from '@/hooks';
import { useDeleteExpenseCategory } from './api/delete-category';
import { AddExpenseSubCategory } from './components/add-expense-subcategory';
import { Category, Subcategory } from './types';
import { SubcategoryItem } from './components/subcategory';
import { ErrorMessage } from '../../Components/errors/error-message';
import { AddExpenseCategoryForm } from './components/add-category-form';

export const ExpenseCategoryList: React.FC = () => {
  const { t } = useTranslation(['common', 'categories']);
  const { openConfirmDialog } = useConfirmDialog();
  const { deleteCategory } = useDeleteExpenseCategory();
  const { expenseCategories, isLoading, isError, refetchExpenseCategories } =
    useExpenseCategories();

  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set(),
  );

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openSubCategoryModal, setOpenSubCategoryModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>();

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleDeleteCategory = (categoryId: number) => {
    openConfirmDialog({
      title: t('common:alert.are-you-sure'),
      message: t('categories:expense:category-delete-warning-message'),
      onConfirm: async () => {
        try {
          await deleteCategory(categoryId);
          toast({
            title: t('common:alert.deleted'),
            description: t('categories:expense.category-is-deleted'),
          });
        } catch (error) {
          console.error('Error deleting account:', error);
          toast({
            title: t('common:errors.operation-failed'),
            description: t('categories:expense.failed-to-delete'),
          });
        }
      },
    });
  };

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="grid justify-items-center grid-cols-1 gap-2 mt-4">
      <Button
        className="flex justify-start content-center gap-2 mb-3 w-full"
        variant="dashed"
        size="sm"
        onClick={() => {
          setSelectedCategory(undefined);
          setOpenCategoryModal(true);
        }}
      >
        <Plus className="h-4 w-4" />
        <small className="text-sm font-medium leading-none">
          {t('categories:expense.new-expense-category')}
        </small>
      </Button>

      {isLoading ? (
        <Busy />
      ) : (
        expenseCategories?.map((category) => {
          const isCollapsed = expandedCategories.has(category.id);
          return (
            <Collapsible
              key={category.id}
              className="bg-white border dark:bg-zinc-800 rounded-lg overflow-hidden w-full"
              open={isCollapsed}
              onOpenChange={() =>
                category.subcategories.length > 0 && toggleCategory(category.id)
              }
            >
              <div className="flex items-center justify-between space-x-4 px-2 py-2">
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="items-left h-6 w-6"
                      disabled={
                        !category.subcategories ||
                        category.subcategories.length === 0
                      }
                    >
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">{t('common:toggle')}</span>
                    </Button>
                  </CollapsibleTrigger>
                  <small className="text-sm font-medium leading-none">
                    {category.name}
                  </small>
                  <div className="border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {category.subcategories?.length ?? 0}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">{t('common:more')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenCategoryModal(true);
                        setSelectedCategory(category);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5 mr-2" /> {t('common:edit')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCategory(category);
                        setOpenSubCategoryModal(true);
                        setSelectedSubcategory(undefined);
                      }}
                    >
                      <PlusCircle className="h-3.5 w-3.5 mr-2" />
                      {t('categories:expense.add-subcategory')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-700"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-2" />{' '}
                      {t('common:delete')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CollapsibleContent>
                {isCollapsed &&
                  category.subcategories?.length > 0 &&
                  category.subcategories?.map((subcategory) => (
                    <SubcategoryItem
                      key={subcategory.id}
                      categoryId={category.id}
                      data={subcategory}
                      mutateCategories={refetchExpenseCategories}
                      onEdit={(subcategory) => {
                        setOpenSubCategoryModal(true);
                        setSelectedCategory(category);
                        setSelectedSubcategory(subcategory);
                      }}
                    />
                  ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })
      )}

      <AddExpenseCategoryForm
        open={openCategoryModal}
        onOpenChange={setOpenCategoryModal}
        selectedCategory={selectedCategory}
      />

      {(selectedCategory || selectedSubcategory) && (
        <AddExpenseSubCategory
          open={openSubCategoryModal}
          onOpenChange={setOpenSubCategoryModal}
          selectedCategory={selectedCategory!}
          selectedSubcategory={selectedSubcategory}
          onCategoryAdded={refetchExpenseCategories}
        />
      )}
    </div>
  );
};

ExpenseCategoryList.displayName = 'ExpenseCategoryList';
