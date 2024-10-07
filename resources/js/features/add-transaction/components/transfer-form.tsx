import React, { useCallback, useState } from 'react';
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
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

import { useAccounts } from '@/features/accounts/api/get-accounts';
import { OptionSelector } from '../../../Components/option-selector';
import { DateSelector } from './form-fields/date-selector';
import { FormProps } from '../types';
import { cn } from '@/utils';

const formSchema = z
  .object({
    transactionDate: z.date({
      required_error: 'A date is required',
    }),
    amount: z.coerce
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .nonnegative(),
    fromAccountId: z.coerce.number({
      required_error: 'Please select an account',
    }),
    toAccountId: z.coerce.number({
      required_error: 'Please select an account',
    }),
    note: z.optional(
      z.string().max(128, { message: 'note can be of max 128 characters' }),
    ),
  })
  .refine((data) => data.fromAccountId !== data.toAccountId, {
    message: 'From and To accounts must be different',
    path: ['toAccountId'],
  });

export const TransferForm = ({ setOpen }: FormProps) => {
  const [showAccountSelector, setShowAccountSelector] = useState<
    string | boolean
  >(false);
  const { allAccounts } = useAccounts();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionDate: new Date(),
      amount: 0,
    },
  });
  const formErrors = form.formState.errors;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.table(values);
    return setOpen(false);
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          name="transactionDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="transactionDate"
                  className="w-1/4"
                >
                  Date
                </FormLabel>
                <DateSelector
                  aria-invalid={formErrors.transactionDate ? 'true' : 'false'}
                  selected={field.value}
                  onSelect={(value: Date) => field.onChange(value)}
                  closeOtherControls={() => setShowAccountSelector(false)}
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
          name="fromAccountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="fromAccountId"
                  className="w-1/4"
                >
                  From
                </FormLabel>
                <Input
                  className="w-3/4"
                  placeholder="Select an account"
                  onClick={() => setShowAccountSelector('fromAccountId')}
                  value={getSelectedAccountName(field.value)}
                  readOnly
                />
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          name="toAccountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="toAccountId"
                  className="w-1/4"
                >
                  To
                </FormLabel>
                <FormControl className="m-0">
                  <Input
                    className="w-3/4"
                    placeholder="Select an account"
                    onClick={() => setShowAccountSelector('toAccountId')}
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
                    onFocus={() => setShowAccountSelector(false)}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <div
          className={cn('overflow-x-auto', {
            'h-44': showAccountSelector,
          })}
        >
          {showAccountSelector && (
            <OptionSelector
              options={allAccounts ?? []}
              onSelect={(value: number) => {
                // @ts-ignore
                form.setValue(showAccountSelector, value);
                setShowAccountSelector(false);
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
