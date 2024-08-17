import React from 'react';
import {
  BarChart2Icon,
  CreditCardIcon,
  FileTextIcon,
  HomeIcon,
  Settings,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '@/hooks';
import { SideNavigationItem } from './types';
import { Button } from '@/Components/ui/button';
import { cn } from '@/utils';
import { BrandLogo } from './brand-logo';
import { NavItem } from './nav-item';
import { AddTransaction } from '@/features/add-transaction';

export const Navigation = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const navItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/app' },
    {
      icon: FileTextIcon,
      label: 'Transactions',
      path: '/app/transactions',
    },
    { icon: CreditCardIcon, label: 'Accounts', path: '/app/accounts' },
    { icon: BarChart2Icon, label: 'Stats', path: '/app/stats' },
    { icon: Settings, label: 'Settings', path: '/app/settings' },
  ].filter(Boolean) as SideNavigationItem[];

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16">
        {navItems.slice(0, -1).map((item, index) => (
          <React.Fragment key={item.path}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                location.pathname === item.path
                  ? 'text-black'
                  : 'text-gray-400',
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-6 w-6" />
            </Button>
            {index === 1 && <AddTransaction />}
          </React.Fragment>
        ))}
      </nav>
    );
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <BrandLogo />
        {navItems.slice(0, -1).map((item) => (
          <NavItem key={item.label} item={item} />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem item={navItems[navItems.length - 1]} />
      </nav>
    </aside>
  );
};
