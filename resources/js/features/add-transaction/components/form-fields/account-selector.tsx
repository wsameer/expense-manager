import React, { useState } from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';

import { FormControl } from '@/Components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/Components/ui/popover';
import { Button } from '@/Components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/Components/ui/command';

import { cn } from '@/utils';

import { ACCOUNTS } from '../../types';

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

export const AccountSelector = React.memo<Props>(({ selected, onSelect }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
    >
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className={cn(
              'w-3/4 justify-between',
              !selected && 'text-muted-foreground',
            )}
          >
            {selected
              ? ACCOUNTS.find((account) => account.value === selected)?.label
              : 'Select account'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0">
        <Command>
          <CommandInput
            className="border-none"
            placeholder="Search account..."
          />
          <CommandList>
            <CommandEmpty>No account found.</CommandEmpty>
            <CommandGroup>
              {ACCOUNTS.map((account) => (
                <CommandItem
                  value={account.label}
                  key={account.value}
                  onSelect={() => {
                    onSelect(account.value!);
                    setIsPopoverOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      account.value === selected ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {account.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

AccountSelector.displayName = 'AccountSelector';
