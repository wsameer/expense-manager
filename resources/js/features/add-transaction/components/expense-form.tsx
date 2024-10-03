import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

import { DateSelector } from './form-fields';
import { OptionSelector } from '../../../Components/option-selector';
import { useAccounts } from '@/features/accounts/api/get-accounts';
import { useExpenseCategories } from '@/features/expense-category/api/use-expense-categories';

const formSchema = z.object({
  date: z.date({
    required_error: 'A date is required',
  }),
  amount: z.coerce
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .nonnegative(),
  categoryId: z.coerce.number({
    required_error: 'Please select a category',
  }),
  accountId: z.coerce.number({
    required_error: 'Please select an account',
  }),
  note: z.optional(
    z.string().max(128, { message: 'Note can be of max 128 characters' }),
  ),
});

export const ExpenseForm = () => {
  const { allAccounts } = useAccounts();
  const { expenseCategories } = useExpenseCategories();

  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      amount: 0,
    },
  });
  const formErrors = form.formState.errors;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const getSelectedAccountName = useCallback(
    (id: number) => {
      if (!id) return undefined;
      return (
        allAccounts?.find((account) => id === account.id)?.name || undefined
      );
    },
    [allAccounts],
  );

  const getSelectedCategoryName = useCallback(
    (id: number) => {
      if (!id) return undefined;
      return (
        expenseCategories?.find((category) => id === category.id)?.name ||
        undefined
      );
    },
    [expenseCategories],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="date"
                  className="w-1/4"
                >
                  Date
                </FormLabel>
                <DateSelector
                  aria-invalid={formErrors.date ? 'true' : 'false'}
                  selected={field.value}
                  onSelect={(value: Date) => field.onChange(value)}
                  closeOtherControls={() => {
                    setShowAccountSelector(false);
                    setShowCategorySelector(false);
                  }}
                />
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="amount"
                  className="w-1/4"
                >
                  Amount
                </FormLabel>
                <FormControl className="m-0">
                  <Input
                    type="number"
                    className="w-3/4"
                    aria-invalid={formErrors.amount ? 'true' : 'false'}
                    onFocus={() => setShowAccountSelector(false)}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="categoryId"
                  className="w-1/4"
                >
                  Category
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-3/4"
                    placeholder="Select a category"
                    onClick={() => {
                      setShowAccountSelector(false);
                      setShowCategorySelector(true);
                    }}
                    value={getSelectedCategoryName(field.value)}
                    readOnly
                  />
                </FormControl>
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="accountId"
                  className="w-1/4"
                >
                  Account
                </FormLabel>
                <FormControl className="m-0">
                  <Input
                    className="w-3/4"
                    placeholder="Select an account"
                    onClick={() => {
                      setShowCategorySelector(false);
                      setShowAccountSelector(true);
                    }}
                    value={getSelectedAccountName(field.value)}
                    readOnly
                  />
                </FormControl>
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          name="note"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="note"
                  className="w-1/4"
                >
                  Note
                </FormLabel>
                <FormControl className="m-0">
                  <Input
                    className="w-3/4"
                    {...field}
                    onFocus={() => setShowAccountSelector(false)}
                  />
                </FormControl>
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <div className="h-44 overflow-x-auto">
          {showAccountSelector && (
            <OptionSelector
              options={allAccounts!}
              onSelect={(option) => {
                form.setValue('accountId', option.id);
                setShowAccountSelector(false);
              }}
            />
          )}

          {showCategorySelector && (
            <OptionSelector
              options={expenseCategories!}
              onSelect={(option) => {
                form.setValue('categoryId', option.id);
                setShowCategorySelector(false);
              }}
            />
          )}
        </div>

        <Button
          className="w-full"
          variant="destructive"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
