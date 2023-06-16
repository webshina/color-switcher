import { UploadDirs } from '#/common/types/UploadDirs';
import { isObject } from './typeNarrower';

export const generateRandomString = (n: number) => {
  var CODE_TABLE =
    '0123456789' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz';
  var r = '';
  for (var i = 0, k = CODE_TABLE.length; i < n; i++) {
    r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
  }
  return r;
};

export const getRandomNumber = (min: number = 0, max: number = 100) => {
  const randomNum = Math.floor(Math.random() * max) + min;
  return randomNum;
};

export const toHex = (stringToConvert: string) => {
  return stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export const shortenString = (str: string, length: number) => {
  const halfLength = Math.round(length / 2);
  const result =
    str.slice(0, halfLength) + '...' + str.slice(-halfLength - 1, str.length);
  return result;
};

export const getImageUrl = (dir: UploadDirs, fileName: string) => {
  const url = `${process.env.NEXT_PUBLIC_IMG_BASE_URL}/uploads/${dir}/${fileName}`;
  return url;
};

export const formatDate = (date: Date, format: string) => {
  format = format.replace(/yyyy/g, date.toLocaleDateString().split('/')[0]);
  format = format.replace(/M/g, date.toLocaleDateString().split('/')[1]);
  format = format.replace(/d/g, date.toLocaleDateString().split('/')[2]);
  format = format.replace(/H/g, date.getHours().toLocaleString());
  format = format.replace(/m/g, date.getMinutes().toLocaleString());
  format = format.replace(/s/g, date.getSeconds().toLocaleString());
  format = format.replace(/S/g, date.getMilliseconds().toLocaleString());
  return format;
};

export const parseError = (error: unknown) => {
  if (isObject(error)) {
    if (error instanceof Error) {
      return JSON.stringify(error.stack);
    }
  }
};

export const wait_ = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
