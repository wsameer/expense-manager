import React, { useEffect, useRef, useState } from 'react';
import { ChevronsUpDown, Check, ChevronRight } from 'lucide-react';

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

import { capitalize, cn } from '@/utils';

import { useAccounts } from '@/features/accounts/api/get-accounts';
import { Input } from '@/Components/ui/input';
import { Account, AccountGroup } from '@/types/api';
import { ACCOUNT_GROUPS } from '@/features/accounts/constants';

type Props = {
  selected: number;
  onSelect: (value: number) => void;
};

/**
 * @deprecated Use AccountPicker instead
 */
export const AccountSelector = React.memo<Props>(({ selected, onSelect }) => {
  const { allAccounts } = useAccounts();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<
    AccountGroup | undefined
  >();
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPopoverOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (allAccounts) {
      const mappedAccount = allAccounts.find(
        (account) => selected === account.id,
      );
      setSelectedAccount(mappedAccount);
      setSelectedGroup(mappedAccount?.group);
    }
  }, [allAccounts, selected]);

  if (!allAccounts) {
    return (
      <FormControl>
        <Input
          disabled
          type="text"
          placeholder="You have no accounts"
        />
      </FormControl>
    );
  }

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
            {selectedAccount ? selectedAccount.name : 'Select account'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0">
        <Command>
          <CommandInput
            ref={inputRef}
            className="border-none"
            placeholder="Search account..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No account found.</CommandEmpty>
            {selectedGroup ? (
              <CommandGroup heading={capitalize(selectedGroup)}>
                <CommandItem
                  onSelect={() => {
                    setSelectedGroup(undefined);
                    setSelectedAccount(undefined);
                  }}
                >
                  ← Back to account groups
                </CommandItem>
                {allAccounts.map((account) => {
                  if (account.group === selectedGroup) {
                    return (
                      <CommandItem
                        key={account.id}
                        onSelect={() => {
                          setSelectedAccount(account);
                          setIsPopoverOpen(false);
                          onSelect(account.id);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selected === account.id
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {account.name}
                      </CommandItem>
                    );
                  }
                  return null;
                })}
              </CommandGroup>
            ) : (
              <CommandGroup heading="Account Types">
                {ACCOUNT_GROUPS.map((type) => (
                  <CommandItem
                    key={type.id}
                    onSelect={() => setSelectedGroup(type.key as AccountGroup)}
                  >
                    <div className="flex justify-between items-center w-full ">
                      {capitalize(type.label)}
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

AccountSelector.displayName = 'AccountSelector';
