import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/Components/ui/popover';
import { cn } from '@/utils';
import { Calendar } from '@/Components/ui/calendar';
import { FormControl } from '@/Components/ui/form';
import { Button } from '@/Components/ui/button';

type DateSelectorProps = {
  selected: Date | undefined;
  onSelect: (selected: Date) => void | undefined;
};

export const DateSelector = React.memo(
  ({ selected, onSelect }: DateSelectorProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleOnSelect = (date: Date | undefined) => {
      if (!date) return;
      onSelect(date);
      setIsPopoverOpen(false);
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-3/4 text-left font-normal',
                !selected && 'text-muted-foreground',
              )}
            >
              {selected ? format(selected, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleOnSelect}
            initialFocus
            required
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DateSelector.displayName = 'DateSelector';