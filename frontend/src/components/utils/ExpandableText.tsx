import React, { useState } from 'react';

type Props = {
  children: string;
};
export const ExpandableText: React.FC<Props> = ({ children: text }) => {
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
          {truncateText(text, 100)}
          <button
            className="text-blue-700"
            onClick={() => setIsTruncated(!isTruncated)}
          >
            {' '}
            [...]
          </button>
        </>
      ) : (
        text
      )}
    </>
  );
};
