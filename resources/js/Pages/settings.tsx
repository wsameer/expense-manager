import React from 'react';
import { PageLayout } from '@/layouts';
import { Settings } from '@/features/settings';

export const SettingsRoute = () => {

  return (
    <PageLayout
      title="Settings"
    >
      <Settings />
    </PageLayout>
  );
};
