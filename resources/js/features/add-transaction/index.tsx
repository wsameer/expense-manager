import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useResponsive } from '@/hooks';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from '@/Components/ui/drawer';
import { Button } from '@/Components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';

import { Transactions } from './components/transactions';

import { useTranslation } from 'react-i18next';
import { TransactionType } from '@/types';

export const AddTransaction = () => {
  const { t } = useTranslation('transaction');
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TransactionType.EXPENSE);
  const { isMobile } = useResponsive();

  const tabTitle = useMemo(
    () => (selectedTab === TransactionType.TRANSFER ? 'transfer' : selectedTab),
    [selectedTab],
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>
          <Button
            className="rounded-full h-14 w-14"
            variant="destructive"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="text-left">
              <DrawerTitle>
                Record {selectedTab === TransactionType.TRANSFER ? 'a' : 'an'}{' '}
                {tabTitle}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <Transactions
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setOpen={setOpen}
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
    );
  }

  return (
    <div className={'fixed bottom-6 right-6'}>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button
            className="rounded-full h-12 w-12"
            variant="destructive"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Record {selectedTab === TransactionType.TRANSFER ? 'a' : 'an'}{' '}
              {selectedTab}
            </DialogTitle>
            <DialogDescription>
              {t('enter-and-submit-your-transaction')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <Transactions
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setOpen={setOpen}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="w-full"
                variant="secondary"
              >
                {t('cancel')}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
