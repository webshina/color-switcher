import { UploadDirs } from '#/common/types/UploadDirs';
import { localStoragePath } from '@/config/config';
import { CopyObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';
import * as Path from 'path';
import { Readable, pipeline } from 'stream';
import util from 'util';

// Define destination of saving file
const getDestination = () => {
  return process.env.AWS_S3_BUCKET ? 's3' : 'local';
};

const getS3 = () => {
  return getDestination() === 's3'
    ? new S3({
        region: 'ap-northeast-1',
        credentials: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
        },
      })
    : undefined;
};
const localUploadPath = '../../storage/uploads';

export const getFileTypeAndExtension = (
  buffer: Buffer
): { mime: string; ext: string } => {
  const signatureToFileInfo: { [key: string]: { mime: string; ext: string } } =
    {
      ffd8ffe0: { mime: 'image/jpeg', ext: 'jpg' },
      ffd8ffe1: { mime: 'image/jpeg', ext: 'jpg' },
      ffd8ffe2: { mime: 'image/jpeg', ext: 'jpg' },
      ffd8ffe3: { mime: 'image/jpeg', ext: 'jpg' },
      ffd8ffe8: { mime: 'image/jpeg', ext: 'jpg' },
      '89504e47': { mime: 'image/png', ext: 'png' },
      '47494638': { mime: 'image/gif', ext: 'gif' },
      '25504446': { mime: 'application/pdf', ext: 'pdf' },
      '504b0304': { mime: 'application/zip', ext: 'zip' },
      '504b0506': { mime: 'application/zip', ext: 'zip' },
      '504b0708': { mime: 'application/zip', ext: 'zip' },
      '52617221': { mime: 'application/x-rar-compressed', ext: 'rar' },
      d0cf11e0: { mime: 'application/vnd.ms-office', ext: 'doc' }, // Older Microsoft Office Formats (doc, xls, ppt)
      '504d0a': { mime: 'text/x-pascal', ext: 'p' },
      // add more cases as needed...
    };

  // check the first few bytes of the buffer for the file signature
  const signature = buffer.toString('hex', 0, 4);
  let fileInfo = signatureToFileInfo[signature];

  if (!fileInfo) {
    throw new Error('File type is invalid');
  }

  return fileInfo;
};

export const getFileInfoFromBuffer = async (buffer: Buffer) => {
  const type = getFileTypeAndExtension(buffer);
  return {
    buffer: buffer,
    ext: type.ext,
    mimetype: type.mime,
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
  await uploadFile({
    dir: props.dir,
    file: buffer,
    fileName: props.fileName,
    extension: type.ext,
    mimetype: type.mimetype,
  });

  return {
    fileName: `${props.fileName}.${type.ext}`,
  };
};

export const uploadFile = async (props: {
  dir: UploadDirs;
  file: Buffer;
  fileName: string;
  extension: string;
  mimetype: string;
}) => {
  const path = `${props.dir}/${props.fileName}.${props.extension}`;

  await _uploadToStorage(props.file, path, props.mimetype);

  return {
    fileName: `${props.fileName}.${props.extension}`,
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
  if (getDestination() === 's3') {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `uploads/${path}`,
      Body: file,
      ContentType: mimetype,
    });
    await getS3()!.send(command);
  } else {
    await util.promisify(pipeline)(
      Readable.from(file),
      fs.createWriteStream(Path.join(__dirname, localUploadPath, path))
    );
  }
};

export const deleteFile = async (dir: UploadDirs, fileName: string) => {
  const path = `uploads/${dir}/${fileName}`;

  if (getDestination() === 's3') {
    getS3()!.deleteObject(
      { Bucket: process.env.AWS_S3_BUCKET!, Key: path },
      (err, data) => {}
    );
  } else {
    fs.unlinkSync(Path.join(__dirname, localUploadPath, path));
  }
};

export const getImageUrl = (path: UploadDirs, imageName: string) => {
  return `${process.env.IMG_BASE_URL}/uploads/${path}/${imageName}`;
};

export const copy = async (
  fromFilePath: string,
  toDir: string,
  toFileName: string
) => {
  if (getDestination() === 's3') {
    const copySource = `${fromFilePath}`;
    const copyDestination = `uploads/${toDir}/${toFileName}`;

    const command = new CopyObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      CopySource: encodeURI(`${process.env.AWS_S3_BUCKET}/${copySource}`),
      Key: copyDestination,
    });

    await getS3()!.send(command);
  } else {
    const copyFile = util.promisify(fs.copyFile);

    // Define the source and destination directories
    const srcFile = Path.resolve(__dirname, localStoragePath, fromFilePath);
    const destFile = Path.resolve(
      __dirname,
      localStoragePath,
      toDir,
      toFileName
    );

    // Copy the file
    await copyFile(srcFile, destFile);
  }
};

export const copyRandomImage = async (
  toDir: UploadDirs,
  toFileName: string
) => {
  const fromDir = 'randomImages';
  // Generate random number of 1-10
  const randomNum = Math.floor(Math.random() * 10) + 1;
  const fromFileName = `${randomNum}.jpeg`;
  await copy(`${fromDir}/${fromFileName}`, `${toDir}`, toFileName);
};
