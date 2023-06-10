import { UploadDirs } from '#/types/UploadDirs';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';
import * as mime from 'mime-types';

// Define destination of saving file
const destination = process.env.AWS_S3_BUCKET ? 's3' : 'local';
const s3 =
  destination === 's3'
    ? new S3({
        region: 'ap-northeast-1',
        credentials: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
        },
      })
    : undefined;

export const getExtensionFromFormidable = async (
  formidableFile: formidable.File | formidable.File[]
) => {
  const file = formidableFile as formidable.File;
  const buffer = fs.readFileSync(file.filepath);
  fs.unlinkSync(file.filepath);
  const mimetype = file.mimetype;
  const ext = mime.extension(mimetype ?? '');
  if (!mimetype || !ext) {
    throw 'File type is invalid';
  }
  return {
    buffer,
    ext,
    mimetype,
  };
};

export const uploadFile = async (
  dir: UploadDirs,
  file: Buffer,
  fileName: string,
  extension: string,
  mimetype: string
) => {
  const path = `uploads/${dir}/${fileName}.${extension}`;

  await _uploadToStorage(file, path, mimetype);

  return {
    fileName: `${fileName}.${extension}`,
    fullPath: `${process.env.NEXT_PUBLIC_IMG_BASE_URL}/${path}`,
  };
};

export const uploadJson = async (
  data: object,
  dir: UploadDirs,
  fileName: string
) => {
  const jsonString = Buffer.from(JSON.stringify(data));
  const path = `uploads/${dir}/${fileName.split('.')[0]}.${
    fileName.split('.')[1]
  }`;

  await _uploadToStorage(jsonString, path, 'application/json');

  return {
    fileName,
    dir,
    fullPath: `${process.env.NEXT_PUBLIC_IMG_BASE_URL}/${path}`,
  };
};

const _uploadToStorage = async (
  file: Buffer,
  path: string,
  mimetype: string
) => {
  if (destination === 's3') {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: path,
      Body: file,
      ContentType: mimetype,
    });
    await s3!.send(command);
  } else {
    fs.writeFileSync('public/' + path, file);
  }
};

export const deleteFile = (dir: UploadDirs, fileName: string) => {
  const path = `uploads/${dir}/${fileName}`;

  if (destination === 's3') {
    s3!.deleteObject(
      { Bucket: process.env.AWS_S3_BUCKET!, Key: path },
      (err, data) => {}
    );
  } else {
    fs.unlinkSync('public/' + path);
  }
};