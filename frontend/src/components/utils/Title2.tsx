import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  fontSize?: number;
  color?: string;
};

const Title2: React.FC<Props> = ({
  title,
  subtitle,
  fontSize = 24,
  color = '#FFF',
}) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="p-1 gradient-text-purple-to-pink text-5xl font-light">
          {title}
        </div>
        <div className="my-3 h-[0.1px] w-[160%] bg-slate-200" />
        <div className="text-xl text-gray-500 font-light">{subtitle}</div>
      </div>
    </>
  );
};

export default Title2;
