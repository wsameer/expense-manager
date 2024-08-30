import React from 'react';

type Props = { title: string; children: React.ReactNode };

export const SettingsGroup = React.memo<Props>(({ title, children }) => {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-4 mb-1">
        {title}
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
});

SettingsGroup.displayName = 'SettingsGroup';
