import React from 'react';
import { PageLayout } from '@/layouts';

export const AccountsRoute = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="">
          Assets
        </div>
        <div className="">
          Liabilities
        </div>
        <div className="">
          Total
        </div>
      </div>
      <p>a sticky top header showing your assets, liabilities, and total balance </p>
      <p>A table displaying category wise your bank accounts and the total balance left</p>
    </PageLayout>
  );
};
