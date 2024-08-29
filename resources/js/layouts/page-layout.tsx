import React, { ReactNode } from 'react';
import { AppNavbar, Head, MobileHeader } from '@/Components/seo';
import { useResponsive } from '@/hooks';
import { cn } from '@/utils';

interface PageLayoutProps {
  title?: string;
  children: ReactNode;
  hideNavbar?: boolean;
}

export const PageLayout = React.memo<PageLayoutProps>(({ title, children, hideNavbar = false }) => {
  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <Head title={title} />
      {!hideNavbar
        ? isMobile
          ? <MobileHeader title={title} />
          : <AppNavbar />
        : null
      }
      <main className={cn('flex-1 overflow-y-auto', {
        'p-4': hideNavbar,
        'px-4 py-1': !hideNavbar
      })}>

        {children}
      </main>
    </div>
  );
});
