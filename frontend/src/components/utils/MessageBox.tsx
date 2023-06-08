import React, { ReactNode } from 'react';

type Props = {
  message?: string;
  children?: ReactNode;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  bgColor?: 'transparent' | 'gray' | 'red' | 'purple';
  textColor?: 'black' | 'white' | 'red';
  opacity?: number;
};
const MessageBox: React.FC<Props> = ({
  message,
  children,
  padding = 20,
  paddingX = 40,
  paddingY = 20,
  bgColor = 'purple',
  textColor = 'black',
  opacity = 1,
}) => {
  const bgColorList = {
    transparent: '',
    purple: 'bg-violet-200',
    gray: 'bg-gray-100',
    red: 'bg-red-600',
  };
  const textColorList = {
    black: 'text-gray-600',
    white: 'text-white',
    red: 'text-red-500',
  };

  return (
    <div
      className={`m-4 rounded-xl ${bgColorList[bgColor]} text-sm ${textColorList[textColor]} border-[1px] border-gray-100 whitespace-pre-wrap`}
      style={{
        paddingTop: paddingY ?? padding,
        paddingBottom: paddingY ?? padding,
        paddingLeft: paddingX ?? padding,
        paddingRight: paddingX ?? padding,
        opacity,
      }}
    >
      {message}
      {children}
    </div>
  );
};

export default MessageBox;
