import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'

import { DashboardPieChart } from './pie-chart'
import { ChartData } from '../types';
import { COLORS } from '../constants';

type Props = {
  currentDate: Date;
};

export const ChartContainer = ({ currentDate }: Props) => {

  // const { data } = useChartData();

  const expenseData: ChartData[] = [
    { category: "Housing", amount: 300 },
    { category: "Food", amount: 500 },
    { category: "Transportation", amount: 300 },
    { category: "Utilities", amount: 200 },
    { category: "Entertainment", amount: 150 },
    { category: "Healthcare", amount: 250 },
    { category: "Miscellaneous", amount: 100 },
  ];

  const chartConfig = {
    ...Object.fromEntries(
      expenseData.map((entry, index) => [
        entry.category,
        { label: entry.category, color: COLORS[index % COLORS.length] },
      ])
    ),
  };

  return (
    <Tabs defaultValue="expenses">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
      </TabsList>
      <TabsContent value="expenses">
        <DashboardPieChart chartConfig={chartConfig} chartData={expenseData} />
      </TabsContent>
      <TabsContent value="income">
        <DashboardPieChart chartConfig={chartConfig} chartData={expenseData} />
      </TabsContent>
    </Tabs>
  )
}
