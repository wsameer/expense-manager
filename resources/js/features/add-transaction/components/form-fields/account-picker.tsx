import { Button } from '@/Components/ui/button';
import { Account } from '@/types/api';
import React from 'react'

type Props = {
  onSelect: (value: number) => void;
  allAccounts: Account[] | undefined;
};


export const AccountPicker = React.memo<Props>(({ allAccounts, onSelect }) => {
  return (
    <div className='grid grid-cols-4 gap-1'>
      {allAccounts?.map((account) =>
        <Button
          key={account.id}
          className='px-2 h-14 whitespace-normal text-left leading-3'
          variant="outline"
          size="lg"
          style={{ fontSize: '11px' }}
          onClick={(e) => { e.preventDefault(); onSelect(account.id) }}
        >
          {account.name}
        </Button>
      )}
    </div>
  )
});

AccountPicker.displayName = "AccountPicker";