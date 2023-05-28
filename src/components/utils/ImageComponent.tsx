import Image from 'next/image';
import React from 'react';

type Props = {
  imgSrc: string;
  height?: number;
  width?: number;
  objectFit?: 'cover' | 'contain';
};

export const ImageComponent: React.FC<Props> = ({
  imgSrc,
  height = 160,
  width = 160,
  objectFit = 'cover',
}) => {
  return (
    <>
      <div className="relative" style={{ height, width }}>
        <Image
          src={imgSrc ? imgSrc : '/images/noImage.jpeg'}
          alt="image"
          layout="fill"
          objectFit={objectFit}
          className="rounded-xl"
        />
      </div>
    </>
  );
};
