import { UploadDirs } from '#/common/types/UploadDirs';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';
import * as Path from 'path';
import { Readable, pipeline } from 'stream';
import util from 'util';

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
const localUploadPath = '../../storage/uploads';

export const getFileTypeAndExtension = (
  buffer: Buffer
): { mime: string; ext: string } | null => {
  // check the first few bytes of the buffer for the file signature
  const signature = buffer.toString('hex', 0, 4);

  switch (signature) {
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return { mime: 'image/jpeg', ext: 'jpg' };
    case '89504e47':
      return { mime: 'image/png', ext: 'png' };
    // add more cases as needed...
    default:
      return null;
  }
};

export const getFileInfoFromBuffer = async (buffer: Buffer) => {
  const type = getFileTypeAndExtension(buffer);
  return {
    buffer: buffer,
    ext: type?.ext,
    mimetype: type?.mime,
  };
};

export const getFileInfoFromFormidable = async (
  formidableFile: formidable.File | formidable.File[]
) => {
  const file = formidableFile as formidable.File;
  const buffer = fs.readFileSync(file.filepath);
  fs.unlinkSync(file.filepath);

  return getFileInfoFromBuffer(buffer);
};

export const saveFileFromUrl = async (props: {
  url: string;
  dir: UploadDirs;
  fileName: string;
}) => {
  const response = await axios(props.url, {
    responseType: 'arraybuffer',
  });
  const buffer = Buffer.from(response.data, 'binary');
  const type = await getFileInfoFromBuffer(buffer);
  if (!type.ext || !type.mimetype) {
    throw 'File type is invalid';
  }
  await uploadFile(props.dir, buffer, props.fileName, type.ext, type.mimetype);
};

export const uploadFile = async (
  dir: UploadDirs,
  file: Buffer,
  fileName: string,
  extension: string,
  mimetype: string
) => {
  const path = `${dir}/${fileName}.${extension}`;

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
  const path = `${dir}/${fileName.split('.')[0]}.${fileName.split('.')[1]}`;

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
    await util.promisify(pipeline)(
      Readable.from(file),
      fs.createWriteStream(Path.join(__dirname, localUploadPath, path))
    );
  }
};

export const deleteFile = (dir: UploadDirs, fileName: string) => {
  const path = `${dir}/${fileName}`;

  if (destination === 's3') {
    s3!.deleteObject(
      { Bucket: process.env.AWS_S3_BUCKET!, Key: path },
      (err, data) => {}
    );
  } else {
    fs.unlinkSync(localUploadPath + '/' + path);
  }
};

export const getImageUrl = (path: UploadDirs, imageName: string) => {
  return `${process.env.IMG_BASE_URL}/uploads/${path}/${imageName}`;
};
