import { cn } from '@/utils';
import React from 'react';
import { Button } from '../ui/button';

type Props = {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
};

export const ListItem = React.memo<Props>(
  ({ icon, label, onClick, rightElement }) => (
    <Button
      className="flex h-10 items-center justify-between py-1 px-4 bg-white dark:bg-zinc-800 dark:hover:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-900 cursor-pointer first:border-t-0"
      onClick={onClick}
      variant="ghost"
      asChild
    >
      <div>
        <div
          className={cn('flex', {
            'flex items-center': icon,
          })}
        >
          {icon ? icon : null}
          <small
            className={cn(
              'text-zinc-900 dark:text-white text-sm font-medium leading-none',
              {
                'ml-3': icon,
              },
            )}
          >
            {label}
          </small>
        </div>
        {rightElement}
      </div>
    </Button>
  ),
);

ListItem.displayName = 'ListItem';
