import React from 'react'
type Props = {
  title?: string;
}

export const MobileHeader = ({ title }: Props) => {
  return (
    <div id="mobile-header" className="sticky top-0 p-4 z-10">
      {title && <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h3>}
    </div>
  )
}
