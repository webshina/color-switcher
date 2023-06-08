import React, { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  id?: string;
};

const LabeledBox: React.FC<Props> = ({ title, children, id }) => {
  return (
    <div className="border-[1px] border-dark-light rounded" id={`${id}`}>
      <div className="rounded-t p-1 pl-3 bg-dark-light text-xs">{title}</div>
      <div className="rounded-b bg-white/10">{children}</div>
    </div>
  );
};

export default LabeledBox;
