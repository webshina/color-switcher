import useModal from '@/hooks/utils/useModal';
import Image from 'next/image';
import React from 'react';

type Props = {
  imgSrc: string;
  id?: string;
  height: number;
  width: number;
};

const ImageExpandable: React.FC<Props> = ({ imgSrc, id, height, width }) => {
  const { modal: expandImageModal, setIsShow: setExpandImageModal } = useModal({
    noPadding: true,
    children: (
      <>
        <div className="relative h-[90vw] w-[90vw]">
          <Image
            src={imgSrc ? imgSrc : '/images/noImage.jpeg'}
            alt="image"
            layout="fill"
            objectFit="contain"
            className="rounded-t-xl"
          />
        </div>
      </>
    ),
  });

  return (
    <>
      {expandImageModal}
      <button
        id={id}
        className="relative mx-auto"
        style={{ height, width }}
        onClick={() => setExpandImageModal(true)}
      >
        <Image
          src={imgSrc ? imgSrc : '/images/noImage.jpeg'}
          alt="image"
          layout="fill"
          objectFit="contain"
          className="rounded-t-xl"
        />
      </button>
    </>
  );
};

export default ImageExpandable;
