import React from 'react'

type Props = {
  label: string;
  value: number;
}

export const Stats = ({ label, value }: Props) => {
  return (
    <div className="flex-1 bg-white dark:bg-zinc-800 border rounded-xl h-12 flex flex-col items-center justify-center">
      <small className="text-xs font-medium leading-none">{label}</small>
      <small className="text-xs mt-2 font-medium leading-none">
        {value}
      </small>
    </div>
  )
}
