import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { LoginForm } from '@/features/auth/login-form';
import { AuthLayout } from '@/layouts';
import { APP_ROUTE } from '@/router/routes';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Login">
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
