import Image from 'next/image';
import React, { ReactNode } from 'react';

type Props = {
  imgSrc: string;
  title: string;
  children: ReactNode;
  width?: number;
  id?: string;
};
const ImageCard: React.FC<Props> = (props) => {
  return (
    <>
      <div
        id={props.id}
        className="m-1 rounded-xl border border-dark-light"
        style={{ width: props.width }}
      >
        <div className="relative">
          <div className="relative h-[250px]">
            <Image
              src={props.imgSrc ? props.imgSrc : '/images/noImage.jpeg'}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
          </div>
          <div className="absolute bottom-0 p-2 w-full bg-black/40 font-bold">
            {props.title}
          </div>
        </div>
        <div className="px-3 py-1">{props.children}</div>
      </div>
    </>
  );
};

export default ImageCard;
