import Image from 'next/image';
import React from 'react';

type Props = {
  imgSrc: string;
  height?: number;
  width?: number;
};

const CircleImage: React.FC<Props> = ({
  imgSrc,
  width = 240,
  height = 240,
}) => {
  return (
    <>
      <div className="rounded-full border-dark-light">
        <div className="relative" style={{ width, height }}>
          <Image
            src={imgSrc}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default CircleImage;
