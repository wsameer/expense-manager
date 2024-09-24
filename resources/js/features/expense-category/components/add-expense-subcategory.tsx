import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';
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
import { Category, Subcategory } from '../types';
import { useExpenseSubcategories } from '../api/use-subcategories';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onCategoryAdded: () => void;
  selectedCategory: Category;
  selectedSubcategory: Subcategory | undefined;
};

const FormSchema = z.object({
  categoryName: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  subCategoryName: z.string().min(2, {
    message: 'Subcategory name must be at least 2 characters.',
  }),
});

export const AddExpenseSubCategory = ({
  open,
  onOpenChange,
  onCategoryAdded,
  selectedCategory,
  selectedSubcategory,
}: Props) => {
  const { createSubcategory, updateSubcategory } = useExpenseSubcategories(selectedCategory.id);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subCategoryName: selectedSubcategory?.name || '',
      categoryName: selectedCategory.name,
    },
  });

  const handleCreateExpenseSubcategory = async (
    values: z.infer<typeof FormSchema>,
  ) => {
    if (!values) return false;

    try {
      await createSubcategory({ name: values.subCategoryName });
      onCategoryAdded(); // mutate Category API
      form.reset();
      toast({
        title: 'Expense Subcategory Created',
        description: `Subcategory "${values.subCategoryName}" has been created`,
      });
      return onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Operation failed!',
        description: error.message,
      });
    }
  };

  const handleEditExpenseSubcategory = async (data: z.infer<typeof FormSchema>) => {
    if (!data) return false;

    try {
      await updateSubcategory(selectedSubcategory?.id!, { name: data.subCategoryName });
      onCategoryAdded();
      form.reset();
      toast({
        title: 'Subcategory Updated',
        description: `Subcategory "${data.subCategoryName}" has been updated`,
      });
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
      categoryName: selectedCategory ? selectedCategory.name : '',
      subCategoryName: selectedSubcategory ? selectedSubcategory.name : ''
    });
  }, [selectedCategory, selectedSubcategory, form.reset]);


  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Expense Subcategory</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              selectedSubcategory
                ? handleEditExpenseSubcategory
                : handleCreateExpenseSubcategory,
            )}
            className="space-y-6"
          >
            <div className="my-4">
              <div className="mb-4">
                <FormField
                  name="categoryName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="categoryName">
                        Category Name
                      </FormLabel>
                      <Input
                        placeholder="Category Name"
                        value={selectedCategory.name}
                        readOnly
                      />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="subCategoryName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="subCategoryName">
                      Subcategory Name
                    </FormLabel>
                    <Input
                      placeholder="Subcategory Name"
                      {...field}
                    />
                    <FormMessage role="alert" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
            >
              {selectedSubcategory ? 'Save changes' : 'Create Expense Subcategory'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
