import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Skeleton } from '@/Components/ui/skeleton';
import { EmptyTransactions } from '@/Components/shared/empty-data';

import { useTransactions } from '../api/get-transactions';
import { groupTransactionsByDate } from '../utils';
import { TransactionItem } from './transaction-item';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/Components/ui/drawer';
import { Button } from '@/Components/ui/button';
import { Transaction, TransactionTypes } from '../types';
import { Transactions } from '@/features/add-transaction/components/transactions';

type Props = {
  currentDate: Date;
};

export const TransactionList = ({ currentDate }: Props) => {
  const { t } = useTranslation('transaction');
  const { allTransactions, isError, isLoading } = useTransactions(
    new Date(currentDate).toISOString().slice(0, 7),
  );

  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TransactionTypes.EXPENSE);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction>();

  const onTransactionClick = (t: Transaction) => {
    setOpen(true);
    setSelectedTab(t.type);
    setTransactionToEdit(t);
  };

  const tabTitle = useMemo(
    () =>
      selectedTab === TransactionTypes.TRANSFER ? 'transfer' : selectedTab,
    [selectedTab],
  );

  if (isError) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {t('get-error-message')}
        </h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="h-[24px] w-full rounded-xl" />
        <Skeleton className="h-[24px] w-full rounded-xl" />
      </div>
    );
  }

  if (allTransactions?.length === 0) {
    return <EmptyTransactions />;
  }

  const groupedTransactions = groupTransactionsByDate(allTransactions!);
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <div className="flex flex-wrap flex-col gap-4 mb-4">
      {sortedDates.map((date: string) => (
        <div key={date}>
          <p className="text-sm mb-1">
            {new Date(`${date}T00:00:00`).toLocaleDateString('en-CA', {
              weekday: 'short',
              day: 'numeric',
            })}
          </p>
          <ul className="bg-white border dark:bg-zinc-800 rounded-lg overflow-hidden">
            {groupedTransactions[date].map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onTransactionClick={onTransactionClick}
              />
            ))}
          </ul>
        </div>
      ))}

      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="text-left">
              <DrawerTitle>
                Record {selectedTab === TransactionTypes.TRANSFER ? 'a' : 'an'}{' '}
                {tabTitle}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <Transactions
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setOpen={setOpen}
                data={transactionToEdit}
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
