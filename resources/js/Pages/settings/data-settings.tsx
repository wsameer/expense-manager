import React from 'react';

import { PageLayout } from '@/layouts';
import { SETTINGS_ROUTE } from '@/router/routes';
import { ListGroup } from '@/Components/list-group';
import { ListItem } from '@/Components/list-group/list-item';
import { Eraser, FileDown, FileUp } from 'lucide-react';

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
      <div
        id="data-settings"
        className="grid grid-cols-1 gap-6"
      >
        <ListGroup title="Export/Import">
          <ListItem
            icon={
              <FileUp className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
            }
            label="Import from CSV"
            rightElement={undefined}
          />
          <ListItem
            icon={
              <FileDown className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
            }
            label="Export to CSV"
            rightElement={undefined}
          />
          <ListItem
            icon={
              <FileDown className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
            }
            label="Export to PDF"
            rightElement={undefined}
          />
        </ListGroup>
        <ListGroup title="Other">
          <ListItem
            icon={
              <Eraser className="h-4 w-4 text-red-600 dark:text-zinc-300" />
            }
            label="Erase All Content and Settings"
            rightElement={undefined}
            variant='danger'
          />
        </ListGroup>
      </div>
    </PageLayout>
  );
};
