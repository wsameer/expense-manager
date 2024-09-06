import React, { ReactElement } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type Props = {
  title?: string;
  showStickyHeader: boolean;
  backUrl?: string;
  rightElement?: ReactElement;
};

export const MobileHeader = ({
  title,
  backUrl,
  showStickyHeader,
  rightElement,
}: Props) => {
  return (
    <header
      id="mobile-header"
      className="sticky top-0 h-14 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {showStickyHeader ? (
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex-1 text-left">
            {backUrl && (
              <Button
                className="p-0 h-8 rounded-full justify-center"
                variant="ghost"
                size="icon"
                asChild
              >
                <Link to={backUrl}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
          <div className="flex text-center">
            <small className="text-sm font-medium leading-none">{title}</small>
          </div>
          <div className="flex-1 text-right">{rightElement}</div>
        </div>
      ) : null}
    </header>
  );
};
