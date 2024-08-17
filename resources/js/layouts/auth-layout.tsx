import { BrandLogo } from '@/Components/navigation/brand-logo';
import { Head } from '@/Components/seo';
import { APP_ROUTE } from '@/router/routes';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ title, children }: LayoutProps) => {
  // TODO
  // const user = useUser();
  const user = {
    data: false,
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(APP_ROUTE, {
        replace: true,
      });
    }
  }, [user.data, navigate]);

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <BrandLogo />
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
