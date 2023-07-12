import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RiDragDropLine } from 'react-icons/ri';
import Resizer from 'react-image-file-resizer';
import ImageUploading, { ImageListType } from 'react-images-uploading';

export const useImagesUploader = (
  multiple: boolean = true,
  initImageUrls?: string[],
  onChange?: (imageList: ImageListType) => void
) => {
  const [images, setImages] = useState<File[]>([]);

  // Set init images
  useEffect(() => {
    if (initImageUrls && initImageUrls[0]) {
      let initImages: File[] = [];
      for (let i = 0; i < initImageUrls.length; i++) {
        fetch(initImageUrls[i]).then((image) => {
          image.blob().then((blob) => {
            const file = new File([blob], `image[${i}].jpg`, {
              type: blob.type,
            });
            initImages.push(file);
            setImages(initImages);
          });
        });
      }
    }
  }, [initImageUrls?.length]);

  const _onChange = (imageList: ImageListType) => {
    for (let image of imageList) {
      Resizer.imageFileResizer(
        image.file as Blob,
        1024,
        1024,
        'PNG',
        100,
        0,
        (file) => {
          if (multiple) {
            setImages([...images, file as File]);
          } else {
            setImages([file as File]);
          }
        },
        'file'
      );
    }
    onChange && onChange(imageList);
  };

  const uploadedImagesJSX = images.map((image, idx) => (
    <div
      id={`uploaded-img-${idx}`}
      key={idx}
      className="relative"
      style={{
        width: 120,
        height: 120,
      }}
    >
      <Image
        src={URL.createObjectURL(image)}
        alt="image"
        objectFit="cover"
        layout="fill"
        className="rounded-xl"
      />
    </div>
  ));

  const uploadForm = (
    <ImageUploading
      value={images}
      onChange={_onChange}
      inputProps={{ id: 'image-input' }}
    >
      {({ imageList, onImageUpload, isDragging, dragProps }) => (
        <div
          className="flex flex-col justify-center items-center p-8 rounded"
          style={{
            backgroundColor: isDragging ? '#AAA' : '#333',
            border: 'dotted 2px #AAA',
          }}
          {...dragProps}
        >
          <button
            onClick={onImageUpload}
            className="px-3 py-1 bg-discord-purple rounded text-xs text-white"
          >
            Upload
          </button>
          <div className="h-5"></div>

          {/* Uploaded image */}
          {images.length > 0 ? (
            uploadedImagesJSX
          ) : (
            <RiDragDropLine size={40} className="mb-3" />
          )}
        </div>
      )}
    </ImageUploading>
  );

  return {
    uploadForm,
    images,
    setImages,
  };
};
