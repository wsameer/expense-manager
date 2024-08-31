import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';

import {
  CreateAccountForm,
  CreateAccountFormSchema,
} from './api/create-account';
import { AccountGroup } from '@/types/api';
import { capitalize, cn } from '@/utils';
import { Button } from '@/Components/ui/button';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Link } from 'react-router-dom';
import { SETTINGS_ROUTE } from '@/router/routes';
import { ACCOUNT_GROUPS } from './constants';

type Props = React.ComponentProps<'form'> & {
  name?: string;
  group: AccountGroup;
  balance?: number;
  description?: string | undefined;
  paymentAccountId?: string | undefined;
};

export const AccountForm = ({
  className,
  name,
  group,
  paymentAccountId,
  description,
  balance = 0.00,
}: Props) => {
  const { t } = useTranslation('account', {
    keyPrefix: 'create-account',
  });

  const form = useForm<CreateAccountForm>({
    resolver: zodResolver(CreateAccountFormSchema),
    defaultValues: {
      name: name ?? '',
      balance,
      group,
      description: description ?? '',
    },
  });

  function onSubmit(values: CreateAccountForm) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="name"
                  className="w-1/4"
                >
                  {t('name')}
                </FormLabel>
                <Input
                  placeholder="Account Name"
                  {...field}
                />
              </div>
              <FormDescription>
                {t('name-hint')}
              </FormDescription>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          name='group'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ACCOUNT_GROUPS.map((account, index) =>
                    <SelectItem
                      key={index}
                      value={account}
                    >
                      {capitalize(account)}
                    </SelectItem>)}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage account groups in your{" "}
                <Link to={SETTINGS_ROUTE}>account settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="balance"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="balance"
                  className="w-1/4"
                >
                  {t('balance')}
                </FormLabel>
                <Input
                  type='number'
                  {...field}
                />
              </div>
              <FormDescription>
                {t('balance-hint')}
              </FormDescription>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="description"
                  className="w-1/4"
                >
                  {t('description')}
                </FormLabel>
                <Input
                  {...field}
                />
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <div className=""></div>

        <Button
          className="w-full"
          variant="destructive"
          type="submit"
        >
          {t('submit-button')}
        </Button>
      </form>
    </Form>
  );
};
