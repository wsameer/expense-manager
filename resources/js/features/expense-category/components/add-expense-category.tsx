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
import { useExpenseCategories } from '../api/use-expense-categories';
import { Category } from '../types';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  editMode?: Category;
};

const FormSchema = z.object({
  categoryName: z.string().min(2, {
    message: 'Category Name must be at least 2 characters.',
  }),
});

export const AddExpenseCategory = ({
  open,
  onOpenChange,
  editMode = undefined,
}: Props) => {

  const { createCategory, updateCategory, refetchExpenseCategories } = useExpenseCategories();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryName: editMode ? editMode.name : '',
    },
  });

  const handleCreateExpenseCategory = async (
    values: z.infer<typeof FormSchema>,
  ) => {
    if (!values) return false;

    try {
      await createCategory({
        name: values.categoryName
      });
      refetchExpenseCategories();
      form.reset();
      toast({
        title: 'Expense category created',
        description: `Category "${values.categoryName}" has been created`,
      });
      return onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Operation failed!',
        description: error.message,
      });
    }
  };

  const handleEditExpenseCategory = async (values: z.infer<typeof FormSchema>) => {
    if (!values || !editMode) return false;
    try {
      await updateCategory(editMode.id.toString(), {
        name: values.categoryName
      });
      refetchExpenseCategories();
      form.reset();
      toast({
        title: 'Expense category updated',
        description: `Category "${values.categoryName}" has been updated`,
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
    if (editMode) {
      form.reset({
        categoryName: editMode.name
      });
    }
  }, [editMode, form.reset]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Expense Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              editMode
                ? handleEditExpenseCategory
                : handleCreateExpenseCategory,
            )}
            className="space-y-6"
          >
            <div className="my-4">
              <FormField
                name="categoryName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="categoryName">Category Name</FormLabel>
                    <Input
                      placeholder="Category Name"
                      {...field}
                    />
                    <FormMessage role="alert" />
                  </FormItem>
                )
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full"
            >
              {editMode ? 'Save changes' : 'Create'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
