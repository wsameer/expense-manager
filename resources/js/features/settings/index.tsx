import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ChevronRight,
  Coins,
  CreditCard,
  Moon,
  PiggyBank,
  Search,
  Sun,
  WalletCards,
} from 'lucide-react';
import { z } from 'zod';

import { Switch } from '@/Components/ui/switch';
import { Button } from '@/Components/ui/button';
import { useAuth } from '@/lib/use-auth';
import { Input } from '@/Components/ui/input';
import { ListGroup } from '@/Components/list-group';
import { ListItem } from '@/Components/list-group/list-item';

import { useTheme } from '../theme/theme-provider';

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const { t } = useTranslation('common', {
    keyPrefix: 'settings',
  });

  /**
   * @TODO
   */
  const searchFormSchema = z.object({
    query: z
      .string()
      .min(1, 'Search query cannot be empty')
      .max(100, 'Search query is too long'),
  });

  return (
    <div
      id="app-settings"
      className="grid grid-cols-1 gap-6"
    >
      <form className="ml-auto w-full sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>

      <ListGroup title="Appearance">
        <ListItem
          icon={
            theme === 'dark' ? (
              <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            )
          }
          label="Dark Mode (Beta)"
          rightElement={
            <Switch
              className="w-10"
              checked={theme === 'dark'}
              onCheckedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
            />
          }
        />
      </ListGroup>

      <ListGroup title="Category/Accounts">
        <ListItem
          icon={<Coins className="h-4 w-4 text-gray-600 dark:text-gray-300" />}
          label={'Income Category settings'}
          rightElement={
            <Link to={''}>
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Link>
          }
        />
        <ListItem
          icon={
            <WalletCards className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          }
          label={'Expense Category settings'}
          rightElement={
            <Link to={''}>
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Link>
          }
        />
        <ListItem
          icon={
            <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          }
          label={'Accounts settings'}
          rightElement={
            <Link to={''}>
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Link>
          }
        />
        <ListItem
          icon={
            <PiggyBank className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          }
          label={'Budget settings'}
          rightElement={
            <Link to={''}>
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Link>
          }
        />
      </ListGroup>

      <Button
        className="mb-6 w-full"
        variant="outline"
        onClick={logout}
      >
        {t('logout')}
      </Button>
    </div>
  );
};
