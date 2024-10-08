import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import { Spinner } from '@/Components/ui/spinner';
import { Navigation } from '@/Components/navigation';
import { useResponsive } from '@/hooks';
import { AddTransaction } from '@/features/add-transaction';

export const AppRoot = () => {
  const location = useLocation();
  const { isMobile } = useResponsive();

  return (
    <div className="relative flex min-h-screen flex-col bg-muted/40">
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong!</div>}
        >
          <Navigation />
          <Outlet />
          {!isMobile && <AddTransaction />}
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
