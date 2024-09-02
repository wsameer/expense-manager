import React from 'react'

import { PageLayout } from '@/layouts'
import { useParams } from 'react-router-dom';

export const AccountDetailsRoute = () => {
  const params = useParams();
  const accountId = params.accountId as string;

  return (
    <PageLayout
      title="Account"
    >
      <h1>Details of your account</h1>
    </PageLayout>
  )
}
