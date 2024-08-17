import React from 'react';

import { WalletMinimal } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const BrandLogo = () => {
  return (
    <NavLink
      to="/app"
      className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    >
      <WalletMinimal className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">Budget Tracker</span>
    </NavLink>
  );
};
