import Image from 'next/image';
import React from 'react';

type Props = {
  imgSrc: string;
  height?: number;
  width?: number;
};

export const ImageComponent: React.FC<Props> = ({
  imgSrc,
  height = 160,
  width = 160,
}) => {
  return (
    <>
      <div className="relative" style={{ height, width }}>
        <Image
          src={imgSrc ? imgSrc : '/images/noImage.jpeg'}
          alt="image"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
    </>
  );
};
