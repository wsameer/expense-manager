import React from 'react';
import { PageLayout } from '@/layouts';
import { useAuth } from '@/lib/use-auth';

export const DashboardRoute = () => {
  const { user } = useAuth();
  return (
    <PageLayout title='Dashboard' hideNavbar>
      <h2 className="scroll-m-20 text-3xl tracking-tight">
        Hi, <strong>{user!.name}</strong>
      </h2>
    </PageLayout>
  );
};
