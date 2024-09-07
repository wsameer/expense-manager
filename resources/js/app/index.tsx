import React from 'react';
import AppProvider from './provider';
import { AppRouter } from '../router';
import { ThemeProvider } from '@/features/theme/theme-provider';

export const App = () => {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ThemeProvider>
  );
};
