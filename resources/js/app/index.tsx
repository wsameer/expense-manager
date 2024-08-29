import React from 'react';
import AppProvider from './provider';
import { AppRouter } from '../router';
import { AuthProvider } from '@/features/auth/auth-provider';
import { ThemeProvider } from '@/features/theme/theme-provider';

import { Toaster } from '@/Components/ui/toaster';

export const App = () => {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <AppProvider>
        <AuthProvider>
          <Toaster />
          <AppRouter />
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
  );
};
