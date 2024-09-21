import React, { useState } from 'react';
import { useExpenseCategories } from './api/use-expense-categories';
import { Skeleton } from '@/Components/ui/skeleton';
import { Button } from '@/Components/ui/button';
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  MoreVertical,
  Pencil,
  Trash,
} from 'lucide-react';

import { Collapsible, CollapsibleTrigger } from '@/Components/ui/collapsible';
import { CollapsibleContent } from '@radix-ui/react-collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { useConfirmDialog } from '@/Components/ui/confirmable';
import { toast } from '@/hooks';
import { useDeleteExpenseCategory } from './api/delete-category';

export const ExpenseCategoryList: React.FC = () => {
  const { t } = useTranslation(['common', 'categories']);
  const { openConfirmDialog } = useConfirmDialog();
  const { deleteSubcategory, deleteCategory } = useDeleteExpenseCategory();
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set(),
  );
  const { expenseCategories, isLoading, isError } = useExpenseCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[46px] w-full rounded-xl mt-4" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Error loading expense categories. Please try again.
        </h3>
      </div>
    );
  }

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

  const handleDeleteCategory = (categoryId: number, subCategoryId: number | null) => {
    openConfirmDialog({
      title: t('common:alert.are-you-sure'),
      message: t('common:alert.this-action-cannot-be-undone'),
      onConfirm: async () => {
        try {
          if (subCategoryId) {
            await deleteSubcategory(categoryId, subCategoryId);
          } else {
            await deleteCategory(categoryId);
          }
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
    })
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {expenseCategories?.map((category) => (
        <Collapsible
          key={category.id}
          className="bg-white border dark:bg-gray-800 rounded-lg overflow-hidden"
          open={expandedCategories.has(category.id)}
          onOpenChange={() =>
            category.subcategories.length > 0 && toggleCategory(category.id)
          }
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <div className="flex items-center gap-2">
              <p>{category.name}</p>
              <p className="text-sm text-muted-foreground">{`(${category.subcategories?.length ?? 0})`}</p>
            </div>
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 p-0"
                  disabled={
                    !category.subcategories ||
                    category.subcategories.length === 0
                  }
                >
                  <ChevronsUpDown className="w-4 h-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                  >
                    <MoreVertical className="w-4 h-4" />
                    <span className="sr-only">{t('common:more')}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="h-3.5 w-3.5 mr-2" /> {t('common:edit')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-700"
                    onClick={() => handleDeleteCategory(category.id, null)}
                  >
                    <Trash className="h-3.5 w-3.5 mr-2" /> {t('common:delete')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <CollapsibleContent className="space-y-2">
            {expandedCategories.has(category.id) &&
              category.subcategories?.length > 0 && (
                <div>
                  {category.subcategories?.map((subCategory) => (
                    <li
                      key={subCategory.id}
                      className="rounded-md border px-4 py-3 text-sm"
                    >
                      {subCategory.name}
                    </li>
                  ))}
                </div>
              )}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

ExpenseCategoryList.displayName = 'ExpenseCategoryList';
