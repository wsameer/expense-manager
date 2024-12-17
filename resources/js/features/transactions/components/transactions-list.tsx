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
import { Transaction, TypeTotals } from '../types';
import { TransactionType } from '@/types';
import { Transactions } from '@/features/add-transaction/components/transactions';
import {
  CircleArrowDown,
  CircleArrowUp,
  CircleDollarSign,
  Trash2,
} from 'lucide-react';
import { useConfirmDialog } from '@/Components/ui/confirmable';
import { toast } from '@/hooks';
import { useDeleteTransaction } from '../api/delete-transaction';
import { StatCard } from './stat-card';
import { Separator } from '@/Components/ui/separator';

type Props = {
  currentDate: Date;
};

const calculateTotalsByType = (transactions: Transaction[]): TypeTotals => {
  const initialTotals: TypeTotals = {
    [TransactionType.INCOME]: 0,
    [TransactionType.EXPENSE]: 0,
  };

  return transactions.reduce((acc, { type, amount }) => {
    // @ts-ignore
    acc[type] += amount;
    return acc;
  }, initialTotals);
};

export const TransactionList = ({ currentDate }: Props) => {
  const { t } = useTranslation(['transaction', 'common']);
  const { openConfirmDialog } = useConfirmDialog();
  const { allTransactions, isError, isLoading } = useTransactions(
    new Date(currentDate).toISOString().slice(0, 7),
  );

  const { deleteTransaction } = useDeleteTransaction(
    new Date(currentDate).toISOString().slice(0, 7),
  );

  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TransactionType.EXPENSE);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction>();

  const onTransactionClick = (t: Transaction) => {
    setOpen(true);
    setSelectedTab(t.type);
    setTransactionToEdit(t);
  };

  const tabTitle = useMemo(
    () => (selectedTab === TransactionType.TRANSFER ? 'transfer' : selectedTab),
    [selectedTab],
  );

  const handleDeleteTransaction = (id: number) => {
    openConfirmDialog({
      title: t('common:alert.are-you-sure'),
      message: t('transaction:delete-warning-message'),
      onConfirm: async () => {
        try {
          await deleteTransaction(id);
          setOpen(false);
          toast({
            title: t('common:alert.deleted'),
            description: t('transaction:transaction-is-deleted'),
          });
        } catch (error) {
          console.error('Error deleting account:', error);
          toast({
            title: t('common:errors.operation-failed'),
            description: t('transaction:failed-to-delete'),
          });
        }
      },
    });
  };

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
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-2">
          <Skeleton className="h-[25px] w-20 rounded-xl" />
          <Skeleton className="h-[40px] w-full rounded-xl" />
          <Skeleton className="h-[40px] w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Skeleton className="h-[25px] w-20 rounded-xl" />
          <Skeleton className="h-[40px] w-full rounded-xl" />
          <Skeleton className="h-[40px] w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Skeleton className="h-[25px] w-20 rounded-xl" />
          <Skeleton className="h-[40px] w-full rounded-xl" />
          <Skeleton className="h-[40px] w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Skeleton className="h-[25px] w-20 rounded-xl" />
          <Skeleton className="h-[40px] w-full rounded-xl" />
        </div>
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

  const monthlyStats = calculateTotalsByType(allTransactions!);

  const renderMonthlyFinanceStats = () => (
    <div className="bg-white border dark:bg-zinc-800 rounded-2xl p-2 shadow-sm">
      <div className="grid grid-flow-col gap-2">
        <StatCard
          icon={CircleArrowUp}
          value={monthlyStats.income}
          label="Income"
          iconClass="text-green-500 rotate-45"
        />
        <Separator orientation="vertical" />
        <StatCard
          icon={CircleArrowDown}
          value={monthlyStats.expense}
          label="Expense"
          iconClass="text-red-500 rotate-45"
        />
        <Separator orientation="vertical" />
        <StatCard
          icon={CircleDollarSign}
          value={monthlyStats.income - monthlyStats.expense}
          label="Total"
          iconClass="text-zinc-500 dark:text-zinc-200"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap flex-col gap-4 mb-4">
      {renderMonthlyFinanceStats()}
      {sortedDates.map((date: string) => (
        <div key={date}>
          <p className="text-sm mb-1">
            {new Date(`${date}T00:00:00`).toLocaleDateString('en-CA', {
              weekday: 'short',
              day: 'numeric',
            })}
          </p>
          <ul className="bg-white border dark:bg-zinc-800 rounded-xl overflow-hidden">
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
            <DrawerHeader className="flex justify-between items-center text-left">
              <DrawerTitle>
                {t('record')}{' '}
                {selectedTab === TransactionType.TRANSFER ? 'a' : 'an'}{' '}
                {tabTitle}
              </DrawerTitle>
              <Button
                className="text-red-500 hover:text-red-700 h-6 w-6"
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTransaction(transactionToEdit!.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
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
                <Button variant="secondary">{t('cancel')}</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
