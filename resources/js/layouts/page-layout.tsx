import React, { ReactNode } from 'react';
import { AppHeader } from '@/Components/seo/app-header';
import { Head } from '@/Components/seo';

interface PageLayoutProps {
  title?: string;
  children: ReactNode;
}

export const PageLayout = React.memo<PageLayoutProps>(({ title, children }) => {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <Head title={title} />
      <AppHeader />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {children}
      </main>
    </div>
  );
});
