import React, { useCallback, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

import { ExpenseForm } from './expense-form';
import { IncomeForm } from './income-form';
import { TransferForm } from './transfer-form';
import { TransactionTypes } from '@/features/transactions/types';

type TransactionsProps = {
  selectedTab: TransactionTypes;
  setSelectedTab: (value: TransactionTypes) => void;
  setOpen: (value: boolean) => void;
};

export const Transactions: React.FC<TransactionsProps> = React.memo(
  ({ selectedTab, setSelectedTab, setOpen }) => {
    const transactionTypes = useMemo(() => Object.values(TransactionTypes), []);

    const renderContent = useCallback((type: TransactionTypes) => {
      switch (type) {
        case TransactionTypes.EXPENSE:
          return <ExpenseForm setOpen={setOpen} />;
        case TransactionTypes.INCOME:
          return <IncomeForm setOpen={setOpen} />;
        case TransactionTypes.TRANSFER:
          return <TransferForm setOpen={setOpen} />;
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
              {type === TransactionTypes.TRANSFER ? 'Transfer' : type}
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
