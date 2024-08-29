import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { AppNavbar, Head, MobileHeader } from '@/Components/seo';
import { useResponsive } from '@/hooks';
import { cn } from '@/utils';

interface PageLayoutProps {
  title?: string;
  children?: ReactNode;
  pageTitle: ReactNode;
  hideNavbar?: boolean;
}

export const PageLayout = React.memo<PageLayoutProps>(
  ({ title, pageTitle, children, hideNavbar = false }) => {
    const { isMobile } = useResponsive();
    const pageTitleRef = useRef<HTMLDivElement>(null);
    const [showStickyHeader, setShowStickyHeader] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (pageTitleRef.current) {
          // Get the distance from the top of the viewport to the bottom of the pageTitle element
          const titleBottom =
            pageTitleRef.current.getBoundingClientRect().bottom;

          // Adjust when to show the sticky header based on the header height
          const headerHeight = 54; // 46px because h-12 is 48px
          setShowStickyHeader(titleBottom < headerHeight);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Head title={title} />
        <div className="sticky top-0 z-10">
          <MobileHeader
            title={title}
            showStickyHeader={showStickyHeader}
          />
        </div>

        <main className="flex-1 overflow-y-auto py-2 px-4">
          <div
            ref={pageTitleRef}
            id="page-title pt-4"
          >
            {pageTitle}
          </div>

          <div className="h-6"></div>
          {children}
        </main>
      </div>
    );
  },
);
