import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/Components/ui/tooltip';
import { cn } from '@/utils';

import { SideNavigationItem } from './types';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ item }: { item: SideNavigationItem }) => {
  const isActive = location.pathname === item.path;
  return (
    <Tooltip key={item.label}>
      <TooltipTrigger asChild>
        <NavLink
          key={item.label}
          to={item.path}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
            isActive && 'text-accent-foreground bg-accent',
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="sr-only">{item.label}</span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
};
