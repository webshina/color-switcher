import Image from 'next/image';
import React, { ReactNode } from 'react';

type Props = {
  imgSrc: string;
  children: ReactNode;
  height?: string;
  width?: string;
};

const ImageItem: React.FC<Props> = ({
  imgSrc,
  children,
  width = '240px',
  height = '240px',
}) => {
  return (
    <>
      <div className="flex flex-col justify-center m-1 rounded-xl border-dark-light">
        <div>
          <div className="relative mx-auto" style={{ width, height }}>
            <Image
              src={imgSrc}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="px-3 py-1">{children}</div>
      </div>
    </>
  );
};

export default ImageItem;
