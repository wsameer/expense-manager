import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  ACCOUNTS_ROUTE,
  APP_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  BASE_ROUTE,
  TRANSACTIONS_ROUTE,
  SETTINGS_ROUTE,
} from './routes';
import { MainErrorFallback } from '@/Components/errors';
import { AppRoot } from '@/pages/root';
import { ProtectedRoute } from '@/lib/auth-api';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: BASE_ROUTE,
      lazy: async () => {
        const { Welcome } = await import('../pages/welcome');
        return { Component: Welcome };
      },
      errorElement: <MainErrorFallback />,
    },
    {
      path: REGISTER_ROUTE,
      lazy: async () => {
        const { RegisterRoute } = await import('../pages/auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: LOGIN_ROUTE,
      lazy: async () => {
        const { LoginRoute } = await import('../pages/auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: APP_ROUTE,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: TRANSACTIONS_ROUTE,
          lazy: async () => {
            const { TransactionsRoute } = await import('../pages/transactions');
            return { Component: TransactionsRoute };
          },
        },
        {
          path: ACCOUNTS_ROUTE,
          lazy: async () => {
            const { AccountsRoute } = await import('../pages/accounts');
            return { Component: AccountsRoute };
          },
        },
        {
          path: SETTINGS_ROUTE,
          lazy: async () => {
            const { SettingsRoute } = await import('../pages/settings');
            return { Component: SettingsRoute }
          }
        },
        {
          path: '',
          lazy: async () => {
            const { DashboardRoute } = await import('../pages/dashboard');
            return { Component: DashboardRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('../pages/not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};
