import React, { useState } from 'react';
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

import { Transactions } from './transactions';
import { TransactionTypes } from './types';

export const AddTransaction = () => {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TransactionTypes.EXPENSE);
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            className="rounded-full h-12 w-12"
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
                Record {selectedTab === TransactionTypes.TRANSFER ? 'a' : 'an'}{' '}
                {selectedTab}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <Transactions
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
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
    );
  }

  return (
    <div className={'fixed bottom-6 right-6'}>
      <Dialog open={open} onOpenChange={setOpen}>
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
              Record {selectedTab === TransactionTypes.TRANSFER ? 'a' : 'an'}{' '}
              {selectedTab}
            </DialogTitle>
            <DialogDescription>
              Enter and submit the details of your transaction
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <Transactions
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
