import { cn } from '@/utils';
import React from 'react';

type Props = {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
};

export const ListItem = React.memo<Props>(
  ({ icon, label, onClick, rightElement }) => (
    <div
      className="flex h-10 items-center justify-between py-1 px-4 bg-white border-t border-gray-200 dark:bg-gray-800 cursor-pointer first:border-t-0"
      onClick={onClick}
    >
      <div className={cn('flex', {
        'flex items-center': icon
      })}>
        {icon ? icon : null}
        <small className={cn('text-sm font-medium leading-none', {
          'ml-3': icon
        })}>{label}</small>
      </div>
      {rightElement}
    </div>
  ),
);

ListItem.displayName = 'ListItem';
