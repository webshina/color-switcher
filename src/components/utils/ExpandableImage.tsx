import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import 'tailwindcss/tailwind.css';

type Props = {
  imgURL: string;
  width: number;
  height: number;
};

export const ExpandableImage: React.FC<Props> = ({ imgURL, width, height }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <img
        src={imgURL}
        alt=""
        width={width}
        height={height}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <img
            src={imgURL}
            alt=""
            className="max-w-90 max-h-90 transform-gpu"
            style={{ maxWidth: '80%', maxHeight: '80%' }}
          />

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 "
          >
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
};
