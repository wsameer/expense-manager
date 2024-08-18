import React from 'react';
import AppProvider from './provider';
import { AppRouter } from '../router';
import { AuthProvider } from '@/features/auth/auth-provider';
import { Toaster } from '@/Components/ui/toaster';

export const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Toaster />
        <AppRouter />
      </AuthProvider>
    </AppProvider>
  );
};
