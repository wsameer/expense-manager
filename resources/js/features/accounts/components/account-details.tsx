import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Account } from '@/types/api';
import React from 'react';

type Props = {
  data: Account;
};

export const AccountDetails = React.memo(({ data }: Props) => {
  console.log('🚀 ~ AccountDetails ~ data:', data);
  return (
    <div>
      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annually">Annually</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="monthly">Change your password here.</TabsContent>
        <TabsContent value="annually">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
});

AccountDetails.displayName = 'AccountDetails';
