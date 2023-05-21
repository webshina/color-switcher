import React from 'react';

type Props = {
  label?: string;
  message?: string;
};

const ErrorMessage: React.FC<Props> = ({ message, label }) => {
  return (
    <>
      <p id={label && `${label}-error`} className="m-1 text-red-600 text-xs">
        {message as string}
      </p>
    </>
  );
};

export default ErrorMessage;
