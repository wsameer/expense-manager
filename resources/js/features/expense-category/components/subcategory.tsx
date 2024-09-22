import React from 'react'
import { Subcategory } from '../types'
import { Button } from '@/Components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useExpenseSubcategories } from '../api/use-subcategories';
import { toast } from '@/hooks';
import { useConfirmDialog } from '@/Components/ui/confirmable';
import { useTranslation } from 'react-i18next';

type Props = {
  data: Subcategory;
}

export const SubcategoryItem = ({ data }: Props) => {
  const { t } = useTranslation(['common', 'categories']);
  const { deleteSubcategory } = useExpenseSubcategories(data.id);
  const { openConfirmDialog } = useConfirmDialog();

  const handleDeleteSubcategory = () => {
    openConfirmDialog({
      title: t('common:alert.are-you-sure'),
      message: t('common:alert.this-action-cannot-be-undone'),
      onConfirm: async () => {
        try {
          await deleteSubcategory(data.id);
          toast({
            title: t('common:alert.deleted'),
            description: t('categories:expense.subcategory-is-deleted'),
          });
        } catch (error) {
          console.error('Error deleting account:', error);
          toast({
            title: t('common:errors.operation-failed'),
            description: t('categories:expense.failed-to-delete-subcategory'),
          });
        }
      },
    });
  };

  return (
    <div
      key={data.id}
      className="border-t px-4 py-3 text-sm"
    >
      <div className='flex items-center justify-between space-y-2'>
        <small className="text-sm font-medium leading-none">{data.name}</small>
        <div className='flex items-center space-x-1 mt-0'>
          <Button className="text-red-500 hover:text-red-700 h-6 w-6" variant="ghost" size="icon" onClick={handleDeleteSubcategory}>
            <Trash className="h-3 w-3" />
          </Button>
          <Button className="h-6 w-6" variant="ghost" size="icon">
            <Pencil className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
