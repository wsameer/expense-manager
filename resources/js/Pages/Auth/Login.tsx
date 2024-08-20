import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { LoginForm } from '@/features/auth/login-form';
import { AuthLayout } from '@/layouts';
import { APP_ROUTE } from '@/router/routes';
import { useTranslation } from 'react-i18next';

export const LoginRoute = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'forms' });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title={t('login')}>
      <LoginForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : APP_ROUTE}`, {
            replace: true,
          })
        }
      />
    </AuthLayout>
  );
};
