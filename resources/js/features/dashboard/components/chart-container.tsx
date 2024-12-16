import React, { memo, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

import { DashboardPieChart } from './pie-chart';
import { useChartData } from '../api/get-chart-data';
import { Skeleton } from '@/Components/ui/skeleton';
import { TransactionType } from '@/types';
import { PieChartData } from '../types';
import { useTranslation } from 'react-i18next';
import { capitalize } from '@/utils';

type Props = {
  currentDate: string;
};

export const ChartContainer = memo(({ currentDate }: Props) => {
  const { t } = useTranslation('common');
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.EXPENSE,
  );

  const month = new Date(currentDate).toISOString().slice(0, 7);

  const { pieChartData, isLoading } = useChartData(month, transactionType);

  const handleTabChange = (value: string) => {
    setTransactionType(value as TransactionType);
  };

  const renderNoData = () => {
    return (
      <div className="flex items-center justify-center mt-8">
        <p className="text-sm text-muted-foreground">
          {t('no-data-for-this-month')}
        </p>
      </div>
    );
  };

  return (
    <Tabs
      defaultValue={TransactionType.EXPENSE}
      onValueChange={handleTabChange}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={TransactionType.INCOME}>
          {capitalize(TransactionType.INCOME)}
        </TabsTrigger>
        <TabsTrigger value={TransactionType.EXPENSE}>
          {capitalize(TransactionType.EXPENSE)}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TransactionType.EXPENSE}>
        {isLoading && (
          <div className="flex items-center justify-center mt-8">
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>
        )}
        {!isLoading && pieChartData!.length < 1 ? (
          renderNoData()
        ) : (
          <DashboardPieChart chartData={pieChartData ?? []} />
        )}
      </TabsContent>
      <TabsContent value={TransactionType.INCOME}>
        {isLoading && (
          <div className="flex items-center justify-center mt-8">
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>
        )}
        {!isLoading && pieChartData!.length < 1 ? (
          renderNoData()
        ) : (
          <DashboardPieChart chartData={pieChartData ?? []} />
        )}
      </TabsContent>
    </Tabs>
  );
});

ChartContainer.displayName = 'ChartContainer';
