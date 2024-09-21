import React from 'react'
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { EXPENSE_CATEGORIES_API } from '../constants';
import { toast } from '@/hooks';
import axiosInstance from '@/lib/api-client';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  editMode?: number;
  onCategoryAdded: () => void;
}

const FormSchema = z.object({
  categoryName: z.string().min(2, {
    message: "Category Name must be at least 2 characters.",
  }),
})

export const AddExpenseCategory = ({ open, onOpenChange, onCategoryAdded, editMode = undefined }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const handleCreateExpenseCategory = async (values: z.infer<typeof FormSchema>) => {
    if (!values) return false;

    try {
      await axiosInstance.post(EXPENSE_CATEGORIES_API, { name: values.categoryName });
      onCategoryAdded();
      form.reset();
      toast({
        title: 'New Expense Category Created',
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

  const handleEditExpenseCategory = (data: z.infer<typeof FormSchema>) => {
    console.log("🚀 ~ handleEditExpenseCategory ~ data:", data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Expense Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              editMode ? handleEditExpenseCategory : handleCreateExpenseCategory,
            )}
            className="space-y-6"
          >
            <div className="my-4">
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
                      {...field}
                    />
                    <FormMessage role="alert" />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className='w-full'>
              {editMode ? 'Save changes' : 'Create Expense Category'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
