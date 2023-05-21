import Image from 'next/image';
import React from 'react';

type Props = {
  imgSrc: string;
  height?: string;
  width?: string;
};

const RoundedImage: React.FC<Props> = ({
  imgSrc,
  width = '240px',
  height = '240px',
}) => {
  return (
    <>
      <div className="m-1 rounded-xl border-dark-light">
        <div className="relative" style={{ width, height }}>
          <Image
            src={imgSrc}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>
    </>
  );
};

export default RoundedImage;
