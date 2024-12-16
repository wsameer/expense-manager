import React, { memo, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

import { DashboardPieChart } from './pie-chart';
import { useChartData } from '../api/get-chart-data';
import { Skeleton } from '@/Components/ui/skeleton';
import { TransactionType } from '@/types';

type Props = {
  currentDate: string;
};

export const ChartContainer = memo(({ currentDate }: Props) => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.EXPENSE,
  );

  const month = new Date(currentDate).toISOString().slice(0, 7);

  const { pieChartData, isLoading } = useChartData(month, transactionType);

  const handleTabChange = (value: string) => {
    setTransactionType(value as TransactionType);
  };

  return (
    <Tabs
      defaultValue={TransactionType.EXPENSE}
      onValueChange={handleTabChange}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={TransactionType.INCOME}>
          {TransactionType.INCOME}
        </TabsTrigger>
        <TabsTrigger value={TransactionType.EXPENSE}>
          {TransactionType.EXPENSE}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TransactionType.EXPENSE}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <DashboardPieChart chartData={pieChartData ?? []} />
        )}
      </TabsContent>
      <TabsContent value={TransactionType.INCOME}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <DashboardPieChart chartData={pieChartData ?? []} />
        )}
      </TabsContent>
    </Tabs>
  );
});

ChartContainer.displayName = 'ChartContainer';
