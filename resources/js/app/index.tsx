import React from 'react';
import AppProvider from './provider';
import { AppRouter } from '../router';
import { AuthProvider } from '@/features/auth/auth-provider';

export const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppProvider>
  );
};
