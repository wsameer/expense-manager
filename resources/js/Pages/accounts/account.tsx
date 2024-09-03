import React from 'react';

import { PageLayout } from '@/layouts';
import { useParams } from 'react-router-dom';

export const AccountDetailsRoute = () => {
  const { id } = useParams();
  return (
    <PageLayout title="Dynamic Name" showHeader={true}>
      <h1>Details of your account</h1>
      <p>Account ID: {id}</p>
    </PageLayout>
  );
};
