import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogFooter } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { toast } from '@/hooks';
import { Category } from '../types';
import { useIncomeCategories } from '../api/use-categories';
import { Textarea } from '@/Components/ui/textarea';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  selectedCategory?: Category;
};

const FormSchema = z.object({
  categoryName: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  description: z.optional(z.string()),
});

export const AddIncomeCategoryForm = ({
  selectedCategory = undefined,
  onOpenChange,
  open,
}: Props) => {
  const { t } = useTranslation();
  const { createCategory, updateCategory } = useIncomeCategories();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleExpenseCategorySubmit = async (
    values: z.infer<typeof FormSchema>,
  ) => {
    if (!values) return false;

    const isEditing = !!selectedCategory;

    try {
      if (isEditing) {
        await updateCategory(selectedCategory.id.toString(), {
          name: values.categoryName,
          description: values.description ?? '',
        });
      } else {
        await createCategory({
          name: values.categoryName,
          description: values.description ?? '',
        });
      }
      form.reset();
      return onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Operation failed!',
        description: error.message,
      });
    }
  };

  useEffect(() => {
    form.reset({
      categoryName: selectedCategory?.name ?? '',
      description: selectedCategory?.description ?? '',
    });
  }, [selectedCategory, form.reset]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleExpenseCategorySubmit)}
            className="space-y-6"
          >
            <div className="my-4">
              <FormField
                name="categoryName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="categoryName">
                      {t('categories:category-name')}
                    </FormLabel>
                    <Input
                      placeholder="Category Name"
                      {...field}
                    />
                    <FormMessage role="alert" />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-4">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">
                      {t('categories:description')}
                    </FormLabel>
                    <Textarea
                      placeholder="Type your description here"
                      {...field}
                    />
                    <FormMessage role="alert" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
              >
                {selectedCategory
                  ? t('categories:save-changes')
                  : t('categories:create')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
