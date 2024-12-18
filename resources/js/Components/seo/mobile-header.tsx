import React, { ReactElement } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

type Props = {
  title?: string;
  showStickyHeader: boolean;
  backButton?: {
    url?: string;
    title?: string;
  };
  rightElement?: ReactElement;
};

export const MobileHeader = ({
  title,
  showStickyHeader,
  rightElement,
  backButton,
}: Props) => {
  return (
    <header
      id="mobile-header"
      className="sticky top-0 h-14 z-50 w-full border-border/40 bg-background/15 backdrop-blur supports-[backdrop-filter]:bg-background/20"
    >
      {showStickyHeader ? (
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex-1 text-left">
            {backButton && backButton.url && (
              <Button
                className="p-0 h-8 rounded-full justify-center hover:bg-transparent"
                variant="ghost"
                asChild
              >
                <Link to={backButton.url}>
                  <ChevronLeft className="h-5 w-5 mr-0.5" />
                  {backButton.title && (
                    <small className="text-sm font-medium leading-none">
                      {backButton.title}
                    </small>
                  )}
                </Link>
              </Button>
            )}
          </div>
          <div className="flex text-center">
            <p className="text-m font-bold leading-none">{title}</p>
          </div>
          <div className="flex-1 text-right">{rightElement}</div>
        </div>
      ) : null}
    </header>
  );
};
