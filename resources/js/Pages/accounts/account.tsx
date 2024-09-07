import React from 'react';

import { PageLayout } from '@/layouts';
import { useParams } from 'react-router-dom';
import { ACCOUNTS_ROUTE } from '@/router/routes';
import { useBankAccounts } from '@/features/accounts/hooks/use-bank-account';
import { AccountDetails } from '@/features/accounts/components/account-details';
import { EditAccount } from '@/features/accounts/components/edit-account';
import { Account } from '@/types/api';
import { Button } from '@/Components/ui/button';
import { Trash } from 'lucide-react';

export const AccountDetailsRoute = () => {
  const { id } = useParams();
  const { allAccounts } = useBankAccounts();

  if (!id) {
    return (
      <PageLayout
        title="Bruh"
        showHeader={true}
        backUrl={ACCOUNTS_ROUTE}
      >
        <div className="grid justify-center">
          <p className="text-xl text-muted-foreground mt-72">
            Select an account first to see the details
          </p>
        </div>
      </PageLayout>
    );
  }

  const accountDetails = allAccounts?.filter(
    (account: Account) => account.id == parseInt(id, 10),
  );

  if (!accountDetails || accountDetails.length === 0) {
    return (
      <PageLayout
        title="Invalid Request"
        showHeader={true}
        backUrl={ACCOUNTS_ROUTE}
      >
        <div className="grid justify-center">
          <p className="text-xl text-muted-foreground mt-72">
            This account doesn't exist
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={accountDetails[0].name}
      showHeader={true}
      backUrl={ACCOUNTS_ROUTE}
      rightElement={
        <div className="d-flex">
          <Button variant="ghost" size="icon">
            <Trash className='h-4 w-4' />
          </Button>
          <EditAccount
            group={accountDetails[0].group}
            name={accountDetails[0].name}
            paymentAccountId={accountDetails[0].payment_account_id ?? undefined}
            description={accountDetails[0].description}
            balance={accountDetails[0].balance}
            accountId={accountDetails[0].id}
          />
        </div>
      }
    >
      <AccountDetails data={accountDetails[0]} />
    </PageLayout>
  );
};
