import React from 'react';
import { PageLayout } from '@/layouts';
import { useAuth } from '@/lib/use-auth';

export const DashboardRoute = () => {
  const { user } = useAuth();

  const pageTitle = (
    <h2 className="scroll-m-20 text-3xl text-muted-foreground tracking-tight">
      Hi, <span className="font-medium text-black">{user!.name}</span>
    </h2>
  );

  return (
    <PageLayout
      title="Dashboard"
    ></PageLayout>
  );
};
