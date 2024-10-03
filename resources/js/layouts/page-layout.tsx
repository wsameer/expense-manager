import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AppHeader, Head, MobileHeader } from '@/Components/seo';
import { useResponsive } from '@/hooks';
import { cn } from '@/utils';

interface PageLayoutProps {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  showHeader?: boolean;
  rightElement?: ReactElement;
  backButton?: {
    url: string;
    title?: string;
  },
}

export const PageLayout = React.memo<PageLayoutProps>(
  ({
    title,
    children,
    subTitle,
    rightElement,
    showHeader = false,
    backButton
  }) => {
    const { isMobile } = useResponsive();
    const pageTitleRef = useRef<HTMLDivElement>(null);
    const [showStickyHeader, setShowStickyHeader] = useState(showHeader);

    useEffect(() => {
      const handleScroll = () => {
        if (pageTitleRef.current) {
          // Get the distance from the top of the viewport to the bottom of the pageTitle element
          const titleBottom =
            pageTitleRef.current.getBoundingClientRect().bottom;

          // Adjust when to show the sticky header based on the header height
          const headerHeight = 58; // because h-14 is 56px
          setShowStickyHeader(titleBottom < headerHeight);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [showHeader]);

    return (
      <div className="flex flex-col sm:gap-2 md:pt-0 sm:pl-14">
        <Head title={title} />
        {isMobile ? (
          <MobileHeader
            title={title}
            showStickyHeader={showStickyHeader}
            rightElement={rightElement}
            backButton={backButton}
          />
        ) : (
          <AppHeader />
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="container pb-24">
            <div className="mx-auto w-full min-w-0">
              <div className="space-y-2">
                {!showHeader && (
                  <h1
                    ref={pageTitleRef}
                    className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl"
                    id="page-title"
                  >
                    {title}
                  </h1>
                )}
                {subTitle && (
                  <p className="text-sm text-muted-foreground">{subTitle}</p>
                )}
              </div>
              <div
                className={cn({
                  'pt-6': !showHeader,
                })}
              >
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
);
