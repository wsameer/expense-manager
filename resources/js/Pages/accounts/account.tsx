import React from 'react';

import { PageLayout } from '@/layouts';
import { useParams } from 'react-router-dom';
import { ACCOUNTS_ROUTE } from '@/router/routes';
import { useBankAccounts } from '@/features/accounts/hooks/use-bank-account';
import { AccountDetails } from '@/features/accounts/components/account-details';

export const AccountDetailsRoute = () => {
  const { id } = useParams();
  const { allAccounts } = useBankAccounts();

  if (!id) {
    return <PageLayout title="Bruh" showHeader={true} backUrl={ACCOUNTS_ROUTE}>
      <div className="grid justify-center">
        <p className="text-xl text-muted-foreground mt-72">
          Select an account first to see the details
        </p>
      </div>
    </PageLayout>
  }

  const accountDetails = allAccounts?.filter(account => account.id == parseInt(id, 10));

  if (!accountDetails || accountDetails.length === 0) {
    return <PageLayout title="Invalid Request" showHeader={true} backUrl={ACCOUNTS_ROUTE}>
      <div className="grid justify-center">
        <p className="text-xl text-muted-foreground mt-72">
          This account doesn't exist
        </p>
      </div>

    </PageLayout>
  }

  return (
    <PageLayout title={accountDetails[0].name} showHeader={true} backUrl={ACCOUNTS_ROUTE}>
      <AccountDetails data={accountDetails[0]} />
    </PageLayout>
  );
};
