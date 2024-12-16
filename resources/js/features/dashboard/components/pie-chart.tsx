import React from 'react';

import { Pie, Cell, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/Components/ui/chart';
import { COLORS } from '../constants';
import { PieChartData } from '../types';
import { CustomLabel } from './custom-label';

type Props = {
  chartData: Array<PieChartData>;
};

export const DashboardPieChart = ({ chartData }: Props) => {
  const chartConfig = {
    amount: {
      label: 'Total Expense',
    },
    ...Object.fromEntries(
      chartData.map((entry, index) => [
        entry.category,
        { label: entry.category, color: COLORS[index % COLORS.length] },
      ]),
    ),
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col">
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[240px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="totalAmount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={75}
              animationDuration={400}
              label={CustomLabel}
              labelLine={false}
            >
              {chartData.map((_entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelKey="totalAmount"
                  nameKey="category"
                  hideIndicator
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};
