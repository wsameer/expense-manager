import React from 'react';

type Props = { title: string; children: React.ReactNode };

export const ListGroup = React.memo<Props>(({ title, children }) => {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </h2>
      <div className="bg-white border dark:bg-gray-800 rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
});

ListGroup.displayName = 'ListGroup';
