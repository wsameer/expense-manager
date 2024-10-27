import React from 'react';

type Props = {
  label: string;
  value: number;
  color: string;
};

export const Stats = ({ label, value, color }: Props) => {
  return (
    <div className="flex-1 bg-white dark:bg-zinc-800 border rounded-xl h-14 flex flex-col items-center justify-center">
      <small className="text-sm font-medium leading-none">{label}</small>
      <small
        className={`text-sm mt-2 font-medium leading-none text-${color}-600`}
      >
        {value}
      </small>
    </div>
  );
};
