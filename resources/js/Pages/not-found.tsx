import React from 'react';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/Components/ui/button';
import { Link } from '@/Components/ui/link';

export const NotFoundRoute = () => {
  const { t } = useTranslation('common');

  return (
    <div className="mt-52 flex flex-col items-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {t('errors.404-title')}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-6">
        {t('errors.page-does-not-exist')}
      </p>
      <Button variant="outline">
        <Link
          to="/"
          className="flex items-center"
          replace
        >
          <Home className="mr-2 h-4 w-4" />
          {t('errors.go-to-home')}
        </Link>
      </Button>
    </div>
  );
};
