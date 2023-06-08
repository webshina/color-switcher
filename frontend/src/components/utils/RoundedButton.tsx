import React, { ReactNode } from 'react';

type Props = {
  id?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  buttonTxt?: string;
  children?: ReactNode;
  icon?: ReactNode;
  color?: 'pink' | 'gray' | 'dark' | 'transparent';
  round?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  fontSize?: number;
  onClick?: () => void;
};

const RoundedButton: React.FC<Props> = ({
  id,
  type,
  buttonTxt,
  children,
  icon = <></>,
  color = 'pink',
  round = 'full',
  fontSize = 12,
  onClick = () => {},
}) => {
  const colorClass = () => {
    switch (color) {
      case 'pink':
        return 'bg-vivid-pink hover:bg-pink-700';
      case 'gray':
        return 'bg-gray-800 hover:bg-gray-600';
      case 'dark':
        return 'bg-dark hover:bg-dark/50';
      case 'transparent':
        return '';
      default:
        break;
    }
  };
  const roundClass = () => {
    return `rounded-${round}`;
  };

  return (
    <>
      <button
        id={id}
        onClick={onClick}
        className={`flex flex-row justify-center items-center px-4 py-3 hover:text-gray-300 ${roundClass()} text-xs ${colorClass()}`}
        type={type}
      >
        {icon}
        <div className={'mx-3 text-white'} style={{ fontSize }}>
          {buttonTxt ? buttonTxt : children}
        </div>
      </button>
    </>
  );
};

export default RoundedButton;
