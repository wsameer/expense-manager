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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';

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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('login')}</CardTitle>
        <CardDescription>{t('your-email-address')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="login-form"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="email">{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('email-placeholder')}
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
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">{t('password')}</FormLabel>
                    <Button
                      variant="link"
                      className="ml-auto inline-block text-sm underline"
                      asChild
                    >
                      <Link to={FORGOT_PASSWORD}>
                        {t('forgot-your-password')}
                      </Link>
                    </Button>
                  </div>
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
              type="submit"
              className="w-full"
            >
              {t('login')}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {t('dont-have-an-account')}{' '}
          <Link
            to={`${REGISTER_ROUTE}${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
            className="underline"
          >
            {t('sign-up')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
