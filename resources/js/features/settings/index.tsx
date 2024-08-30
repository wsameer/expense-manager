import React from 'react';
import { Switch } from '@/Components/ui/switch';

import { SettingsGroup } from './settings-group';
import { SettingItem } from './setting-item';
import { useTheme } from '../theme/theme-provider';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('common', {
    keyPrefix: 'settings',
  });

  return (
    <div className="">
      <SettingsGroup title="Appearance">
        <SettingItem
          icon={
            theme === 'dark' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )
          }
          label="Dark Mode"
          rightElement={
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
            />
          }
        />
      </SettingsGroup>

      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
      <div className='h-16'>Content</div>
    </div>
  );
};
