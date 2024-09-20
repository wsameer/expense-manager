import React, { useState } from 'react';
import { useExpenseCategories } from './api/useExpenseCategories';
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
import { DeleteExpenseCategory } from './components/delete-category';

export const ExpenseCategoryList: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set(),
  );
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const { expenseCategories, isLoading, isError } = useExpenseCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="h-[24px] w-[150px] rounded-xl" />
        <Skeleton className="h-[24px] w-[150px] rounded-xl" />
        <Skeleton className="h-[24px] w-[150px] rounded-xl" />
        <Skeleton className="h-[24px] w-[150px] rounded-xl" />
        <Skeleton className="h-[24px] w-[150px] rounded-xl" />
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
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="h-3.5 w-3.5 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-700"
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    <Trash className="h-3.5 w-3.5 mr-2" /> Delete
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

      <DeleteExpenseCategory
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        closeDialog={() => setOpenDeleteDialog(false)}
      />
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {expenseCategories?.map((category) => (
          <li
            key={category.id}
            className="p-4"
          >
            <div
              className={`flex items-center justify-between cursor-pointer ${
                category.subcategories?.length === 0 ? 'opacity-50' : ''
              }`}
              onClick={() =>
                category.subcategories?.length > 0 &&
                toggleCategory(category.id)
              }
            >
              <span className="text-lg font-medium text-gray-900">
                {category.name}
              </span>
              {category.subcategories?.length > 0 &&
                (expandedCategories.has(category.id) ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                ))}
            </div>
            {expandedCategories.has(category.id) &&
              category.subcategories?.length > 0 && (
                <ul className="mt-2 ml-4 space-y-2">
                  {category.subcategories?.map((subCategory) => (
                    <li
                      key={subCategory.id}
                      className="text-sm text-gray-600"
                    >
                      {subCategory.name}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

ExpenseCategoryList.displayName = 'ExpenseCategoryList';
