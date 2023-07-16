import React from 'react';

type Props = {};

export const NotificationIcon: React.FC<Props> = (props) => {
  return (
    <div className="relative">
      {/* Here's the red gradient circle. */}
      <span className="h-3 w-3 absolute top-0 right-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></span>
    </div>
  );
};
