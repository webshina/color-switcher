import { AxiosError } from 'axios';

export const isObject = (value: unknown): value is object => {
  return typeof value === 'object' && value !== null;
};

export const isAxiosError = (error: unknown): error is AxiosError => {
  return error instanceof AxiosError;
};

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
