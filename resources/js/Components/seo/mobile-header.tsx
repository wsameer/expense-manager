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
    <div
      id="mobile-header"
      className={cn('bg-white', {
        'h-16 px-4 py-2': showStickyHeader,
        'h-12': !showStickyHeader,
      })}
    >
      {showStickyHeader ? (
        <div className="flex items-center">
          <div className="flex-1 text-left">
            {backUrl && (
              <Button
                className="p-0 rounded-full justify-center"
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
            <Button size={'sm'}>CTA</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
