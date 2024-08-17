import React, { ReactElement } from 'react';

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
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useForm,
  UseFormStateReturn,
} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FORGOT_PASSWORD, REGISTER_ROUTE } from '@/router/routes';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  // const login = useLogin({
  //   onSuccess,
  // });
  const login = true;

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values);
  };

  return (
    <>
      <Form {...form}>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="py-4">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
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
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="link" className="p-0" asChild>
            <Link to={FORGOT_PASSWORD}>Forgot Password?</Link>
          </Button>
          <Button className="mt-4 w-full" variant="default" type="submit">
            Log In
          </Button>
        </form>
      </Form>
      <div className="mt-4 flex items-center justify-end">
        <Button variant="outline" className="w-full" asChild>
          <Link
            to={`${REGISTER_ROUTE}${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
          >
            Create an account
          </Link>
        </Button>
      </div>
    </>
  );
};
