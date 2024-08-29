import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { loginFormSchema } from '@/lib/auth-api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FORGOT_PASSWORD, REGISTER_ROUTE } from '@/router/routes';
import { useAuth } from '@/lib/use-auth';
import { useTranslation } from 'react-i18next';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { t } = useTranslation('auth', { keyPrefix: 'forms' });
  const { login } = useAuth();

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    (await login(values.email, values.password)) && onSuccess();
  };

  return (
    <>
      <Form {...form}>
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="py-4">
                <FormLabel htmlFor="email">{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('your-email-address')}
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
              <FormItem>
                <FormLabel htmlFor="password">{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="*******"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="link"
            className="p-0"
            asChild
          >
            <Link to={FORGOT_PASSWORD}>{t('forgot-password')}</Link>
          </Button>
          <Button
            className="mt-4 w-full"
            variant="default"
            type="submit"
          >
            Log In
          </Button>
        </form>
      </Form>
      <div className="mt-4 flex items-center justify-end">
        <Button
          variant="outline"
          className="w-full"
          asChild
        >
          <Link
            to={`${REGISTER_ROUTE}${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
          >
            {t('create-an-account')}
          </Link>
        </Button>
      </div>
    </>
  );
};
