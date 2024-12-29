import React from 'react';
import { PageLayout } from '@/layouts';
import { DashboardPage } from '@/features/dashboard';

export const DashboardRoute = () => {
  return (
    <PageLayout title="Dashboard">
      <DashboardPage />
    </PageLayout>
  );
};
