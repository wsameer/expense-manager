import React from 'react'

import { Pie, Cell, PieChart } from 'recharts';

import { ChartConfig, ChartContainer } from '@/Components/ui/chart'
import { COLORS } from '../constants';
import { ChartData } from '../types';


type Props = {
  chartConfig: ChartConfig;
  chartData: Array<ChartData>;
}

export const DashboardPieChart = ({ chartConfig, chartData }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[250px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              animationDuration={400}
              labelLine
              label
            >
              {chartData.map((_entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  )
}
