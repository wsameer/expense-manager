import React, { useCallback, useMemo } from 'react';
import { TransactionsProps, TransactionTypes } from './types';
import { ExpenseForm, IncomeForm, TransferForm } from './forms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

export const Transactions: React.FC<TransactionsProps> = React.memo(
  ({ selectedTab, setSelectedTab }) => {
    const transactionTypes = useMemo(() => Object.values(TransactionTypes), []);

    const renderContent = useCallback((type: TransactionTypes) => {
      switch (type) {
        case TransactionTypes.EXPENSE:
          return <ExpenseForm />;
        case TransactionTypes.INCOME:
          return <IncomeForm />;
        case TransactionTypes.TRANSFER:
          return <TransferForm />;
        default:
          return null;
      }
    }, []);

    return (
      <Tabs
        defaultValue={selectedTab}
        onValueChange={(value) => setSelectedTab(value as TransactionTypes)}
      >
        <TabsList className="grid w-full grid-cols-3">
          {transactionTypes.map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className="w-full text-center capitalize"
            >
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
        {transactionTypes.map((type) => (
          <TabsContent
            key={type}
            value={type}
          >
            {renderContent(type as TransactionTypes)}
          </TabsContent>
        ))}
      </Tabs>
    );
  },
);
