import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RegisterForm } from '@/features/auth/register-form';
import { APP_ROUTE, LOGIN_ROUTE } from '@/router/routes';
import { AuthLayout } from '@/layouts';

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Register">
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
