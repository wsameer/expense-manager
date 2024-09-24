import React, { useState } from 'react';
import { useExpenseCategories } from './api/use-expense-categories';
import { Button } from '@/Components/ui/button';
import {
  ChevronsUpDown,
  MoreVertical,
  Pencil,
  PlusCircle,
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
import { AddExpenseSubCategory } from './components/add-expense-subcategory';
import { Category, Subcategory } from './types';
import { SubcategoryItem } from './components/subcategory';
import { Busy } from './components/busy';
import { Error } from './components/error';

type Props = {
  handleEditExpenseCategory: (category: Category) => void;
}

export const ExpenseCategoryList: React.FC<Props> = ({ handleEditExpenseCategory }) => {
  const { t } = useTranslation(['common', 'categories']);
  const { openConfirmDialog } = useConfirmDialog();
  const { deleteCategory } = useDeleteExpenseCategory();
  const {
    expenseCategories,
    isLoading,
    isError,
    refetchExpenseCategories
  } = useExpenseCategories();

  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set(),
  );
  const [openSubCategoryModal, setOpenSubCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>()

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

  if (isLoading) {
    return <Busy />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="grid grid-cols-1 gap-2 mt-4">
      {expenseCategories?.map((category) => (
        <Collapsible
          key={category.id}
          className="bg-white border dark:bg-gray-800 rounded-lg overflow-hidden"
          open={expandedCategories.has(category.id)}
          onOpenChange={() =>
            category.subcategories.length > 0 && toggleCategory(category.id)
          }
        >
          <div className="flex items-center justify-between space-x-4 px-4 py-2">
            <div className="flex items-center gap-2">
              <p>{category.name}</p>
              <p className="text-sm text-muted-foreground">
                {`(${category.subcategories?.length ?? 0})`}
              </p>
            </div>
            <div className="flex items-center">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  disabled={
                    !category.subcategories ||
                    category.subcategories.length === 0
                  }
                >
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">{t('common:toggle')}</span>
                </Button>
              </CollapsibleTrigger>
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
                    onClick={() => handleEditExpenseCategory(category)}
                  >
                    <Pencil className="h-3.5 w-3.5 mr-2" /> {t('common:edit')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenSubCategoryModal(true);
                      setSelectedSubcategory(undefined)
                    }}
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-2" />
                    {t('categories:expense.add-subcategory')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-700"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash className="h-3.5 w-3.5 mr-2" /> {t('common:delete')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <CollapsibleContent>
            {expandedCategories.has(category.id) &&
              category.subcategories?.length > 0 && (
                category.subcategories?.map((subcategory) => (
                  <SubcategoryItem
                    key={subcategory.id}
                    data={subcategory}
                    onEdit={(subcategory) => {
                      setOpenSubCategoryModal(true);
                      setSelectedCategory(category);
                      setSelectedSubcategory(subcategory)
                    }}
                  />
                ))
              )}
          </CollapsibleContent>
        </Collapsible>
      ))}

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
