import React, { useState } from 'react';

type Props = {
  children: string;
  maxLength?: number;
};
export const ExpandableText: React.FC<Props> = ({ children, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit);
    } else {
      return text;
    }
  };

  return (
    <>
      {isTruncated ? (
        <>
          {truncateText(children, maxLength ?? 100)}
          <button
            className="text-blue-700"
            onClick={() => setIsTruncated(!isTruncated)}
          >
            {' '}
            [...]
          </button>
        </>
      ) : (
        children
      )}
    </>
  );
};
