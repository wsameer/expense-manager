import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

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
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '@/router/routes';
import { useAuth } from '@/lib/use-auth';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register } = useAuth();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      await register(values.name, values.email, values.password);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input placeholder="jon@doe.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel htmlFor="password">Password</FormLabel>
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
              <FormItem className="py-2">
                <FormLabel htmlFor="password_confirmation">
                  Confirm Password
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
          <Button className="mt-4 w-full" variant="default" type="submit">
            Register
          </Button>
        </form>
      </Form>
      <Button className="mt-4 w-full" variant="outline" asChild>
        <Link to={LOGIN_ROUTE}>Have an account? Log In</Link>
      </Button>
    </>
  );
};
