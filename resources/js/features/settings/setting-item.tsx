import React from 'react';

type Props = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
};

export const SettingItem = React.memo<Props>(
  ({ icon, label, onClick, rightElement }) => (
    <div
      className="flex items-center justify-between py-2 px-4 bg-white dark:bg-gray-800 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3">{label}</span>
      </div>
      {rightElement}
    </div>
  ),
);

SettingItem.displayName = 'SettingItem';
