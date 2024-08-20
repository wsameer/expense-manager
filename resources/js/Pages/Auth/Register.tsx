import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RegisterForm } from '@/features/auth/register-form';
import { APP_ROUTE, LOGIN_ROUTE } from '@/router/routes';
import { AuthLayout } from '@/layouts';
import { useTranslation } from 'react-i18next';

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth', { keyPrefix: 'forms' });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title={t('register')}>
      <RegisterForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : LOGIN_ROUTE}`, {
            replace: true,
          })
        }
      />
    </AuthLayout>
  );
};
