import { AxiosError } from 'axios';
import { DiscordAPIError } from 'discord.js';
import { FirebaseError } from 'firebase/app';

export const isObject = (value: unknown): value is object => {
  return typeof value === 'object' && value !== null;
};

export const isAxiosError = (error: unknown): error is AxiosError => {
  return error instanceof AxiosError;
};

export const isFirebaseError = (error: unknown): error is FirebaseError => {
  return true;
};

export const isDiscordError = (error: unknown): error is DiscordAPIError => {
  return error instanceof DiscordAPIError;
};

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
