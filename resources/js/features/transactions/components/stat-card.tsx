import React from 'react';
import { LucideIcon } from 'lucide-react';

import { CAD } from '@/utils/constants';

type Props = {
  label: string;
  value: number;
  iconClass?: string;
  icon?: LucideIcon;
};

export const StatCard = ({ label, value, iconClass, icon: Icon }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className={`h-4 w-4 ${iconClass}`} />}
      <div className="flex-1 space-y-1">
        <p
          className="font-medium leading-none"
          style={{ fontSize: '11px' }}
        >
          {label}
        </p>
        <p className="text-sm font-medium">{CAD.format(value)}</p>
      </div>
    </div>
  );
};
