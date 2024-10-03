import { Button } from '@/Components/ui/button';

import React, { useState } from 'react';

interface Option { id: number; name: string, subcategories?: any };

type Props = {
  options: Option[];
  onSelect: (value: any) => void;
};

export const OptionSelector = React.memo<Props>(({ options, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {options?.map((option) => (
        <Button
          key={option.id}
          className="px-2 h-14 whitespace-normal text-center leading-3"
          variant="outline"
          size="lg"
          style={{ fontSize: '11px' }}
          onClick={(e) => {
            e.preventDefault();
            onSelect(option);
          }}
        >
          {option.name}
        </Button>
      ))}
    </div>
  );
});

OptionSelector.displayName = 'OptionSelector';
