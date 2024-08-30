import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { registerFormSchema } from '@/lib/auth-api';
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
import { LOGIN_ROUTE } from '@/router/routes';
import { useAuth } from '@/lib/use-auth';
import { toast } from '@/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register } = useAuth();
  const { t } = useTranslation('auth', { keyPrefix: 'forms' });

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    const success = await register(values.name, values.email, values.password);
    if (success) {
      toast({
        title: t('registration-toast.title'),
        description: t('registration-toast.message'),
      });
      return onSuccess();
    } else {
      form.reset();
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{t('sign-up')}</CardTitle>
        <CardDescription>{t('enter-your-information')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="sign-up-form"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="name">{t('name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="email">{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jon@doe.com"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="password">{t('password')}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*******"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="password_confirmation">
                    {t('confirm-password')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*******"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4 w-full"
              variant="default"
              type="submit"
            >
              {t('create-an-account')}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {t('have-an-account')}{" "}
          <Link to={LOGIN_ROUTE} className='underline'>
            {t('sign-in')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
