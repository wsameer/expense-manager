import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/utils';

type Props = {
  title?: string;
  showStickyHeader: boolean;
  backUrl?: string;
};

export const MobileHeader = ({ title, backUrl, showStickyHeader }: Props) => {
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
                <Link
                  className=""
                  to={''}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
          <div className="flex-1 text-center">
            <small className="text-sm font-medium leading-none">{title}</small>
          </div>
          <div className="flex-1 text-right">
            <Button className="h-8" variant="outline" size={'sm'}>CTA</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
};
