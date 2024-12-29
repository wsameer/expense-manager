import React from 'react';

import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { DataSettings } from '@/features/settings/data-settings';

export const DataSettingsRoute = () => {
  return (
    <PageLayout
      title="My Data"
      showHeaderText={true}
      backButton={{
        url: SETTINGS_ROUTE,
        title: 'Settings',
      }}
    >
      <DataSettings />
    </PageLayout>
  );
};
