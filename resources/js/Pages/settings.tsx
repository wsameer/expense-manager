import React from 'react';
import { PageLayout } from '@/layouts';
import { Head } from '@/Components/seo';

export const SettingsRoute = () => {
  const pageTitle = (
    <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
      Settings
    </h2>
  );

  return (
    <PageLayout
      title="Settings"
      pageTitle={pageTitle}
    >
      <p>SettingsRoute</p>
    </PageLayout>
  );
};
