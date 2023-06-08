import Image from 'next/image';
import React, { ReactNode } from 'react';

type Props = {
  id?: string;
  imgSrc: string;
  bgColor?: 'purple-gradient';
  children: ReactNode;
  height?: number;
  width?: number;
};

const ImageItem: React.FC<Props> = ({
  id,
  imgSrc,
  bgColor,
  children,
  width = 100,
  height = 100,
}) => {
  const bgColorClass = () => {
    switch (bgColor) {
      case 'purple-gradient':
        return 'gradient-bg-purple-to-pink';
      default:
        return '';
    }
  };

  return (
    <div
      id={id}
      className={`flex flex-row p-2 rounded-xl border-[1px] border-dark-light ${bgColorClass()} image-item-row`}
      style={{ height, width }}
    >
      <div className="flex-initial">
        <div
          className="relative"
          style={{ height: height - 20, width: height - 20 }}
        >
          <Image
            src={imgSrc}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>
      <div className="w-2" />
      <div className="px-3 py-1 text-left">{children}</div>
    </div>
  );
};

export default ImageItem;
