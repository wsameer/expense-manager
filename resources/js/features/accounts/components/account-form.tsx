import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

import { AccountGroup } from '@/types/api';
import { capitalize, cn } from '@/utils';
import { Button } from '@/Components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';
import { Link } from 'react-router-dom';
import { SETTINGS_ROUTE } from '@/router/routes';
import { ACCOUNT_GROUPS } from '../constants';
import {
  AccountGroupEnum,
  CreateAccountForm,
  CreateAccountFormSchema,
} from '../types';
import { useBankAccounts } from '../hooks/use-bank-account';
import { toast } from '@/hooks';

type Props = React.ComponentProps<'form'> & {
  name?: string;
  group: AccountGroupEnum;
  balance?: number;
  description?: string | undefined;
  paymentAccountId?: string | undefined;
  setOpen: (value: boolean) => void;
};

export const AccountForm = ({
  className,
  name,
  group,
  paymentAccountId,
  description,
  balance = 0.0,
  setOpen,
}: Props) => {
  const { createAccount } = useBankAccounts();

  const { t } = useTranslation('account', {
    keyPrefix: 'create-account-form',
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

  const handleCreateAccount = async (values: CreateAccountForm) => {
    if (!values) return false;
    const result = await createAccount(values);
    if (result) {
      form.reset();
      toast({
        title: 'New Account Created',
        description: `Your account named "${values.name}" has been created`,
      });
      return setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateAccount)}
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
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          name="group"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mt-4 space-y-0 space-x-2">
                <FormLabel
                  htmlFor="group"
                  className="w-1/4"
                >
                  {t('group')}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a group type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ACCOUNT_GROUPS.map(({ id, label, key }) => (
                      <SelectItem
                        key={id}
                        value={key}
                      >
                        {capitalize(label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormDescription>
                You can manage account groups in your{' '}
                <Link
                  className="underline"
                  to={SETTINGS_ROUTE}
                >
                  account settings
                </Link>
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
                <Input {...field} />
              </div>
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
                <Input {...field} />
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
          {t('create-account')}
        </Button>
      </form>
    </Form>
  );
};
