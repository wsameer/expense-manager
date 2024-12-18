import React, { memo, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

import { DashboardPieChart } from './pie-chart';
import { useChartData } from '../api/get-chart-data';
import { Skeleton } from '@/Components/ui/skeleton';
import { TransactionType } from '@/types';
import { useTranslation } from 'react-i18next';
import { capitalize } from '@/utils';
import { CAD } from '@/utils/constants';
import { Card } from '@/Components/ui/card';
import { COLORS } from '../constants';
import { CircularProgressBar } from './circular-progressbar';

type Props = {
  currentDate: Date;
};

export const Container = memo(({ currentDate }: Props) => {
  const { t } = useTranslation('common');
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.EXPENSE,
  );

  const month = new Date(currentDate).toISOString().slice(0, 7);

  const { pieChartData, isLoading } = useChartData(month, transactionType);

  const totalAmount = pieChartData?.reduce((acc, item) => acc + item.totalAmount, 0);

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

  const renderCategoryList = () => {
    return pieChartData?.map((data, index) => (
      <Card key={data.id} className='flex justify-between bg-white dark:bg-zinc-800 rounded-2xl px-4 py-2 mb-2'>
        <div className='flex gap-4'>
          <CircularProgressBar
            strokeColor={COLORS[index % COLORS.length]}
            percentage={Number.parseInt(((data.totalAmount / (totalAmount ?? 100)) * 100).toFixed(0))} />
          <small className='text-zinc-900 dark:text-white text-sm font-medium leading-7'>
            {data.category}
          </small>
        </div>
        <small className='text-zinc-900 dark:text-white text-sm font-mono leading-7'>
          {CAD.format(data.totalAmount)}
        </small>
      </Card>
    ))
  }

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
          <>
            <DashboardPieChart chartData={pieChartData ?? []} />
            {renderCategoryList()}
          </>
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
          <>
            <DashboardPieChart chartData={pieChartData ?? []} />
            {renderCategoryList()}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
});

Container.displayName = 'Container';
