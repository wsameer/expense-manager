import { BrandLogo } from '@/Components/navigation/brand-logo';
import { Head } from '@/Components/seo';
import { useAuth } from '@/lib/use-auth';
import { APP_ROUTE } from '@/router/routes';
import { WalletMinimal } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ title, children }: LayoutProps) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(APP_ROUTE, {
        replace: true,
      });
    }
  }, [user, navigate]);

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col justify-center bg-zinc-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <BrandLogo size="large" />
          </div>
        </div>

        <div className="mt-8 px-4">{children}</div>
      </div>
    </>
  );
};
