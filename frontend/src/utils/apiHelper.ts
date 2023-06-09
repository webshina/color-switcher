import axios, { AxiosResponse } from 'axios';

const _baseUrl = process.env.NEXT_PUBLIC_API_URL;
type Response = {
  data: any;
  status: number;
  statusText: string;
};

const response = (res: AxiosResponse<any, any>) => {
  const response: Response = {
    data: res.data,
    status: res.status,
    statusText: res.statusText,
  };
  return response;
};

const _convertObjectToQuery = (params?: { [key: string]: any }) => {
  let query = '';
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        if (value instanceof Array) {
          for (const item of value) {
            query += `${key}=${item}&`;
          }
        } else {
          query += `${key}=${value}&`;
        }
      }
    }
  }
  return query;
};

export const get = async (
  url: string,
  params?: { [key: string]: any },
  baseUrl?: string
) => {
  try {
    const fullUrl = `${(baseUrl ?? _baseUrl) + url}?${_convertObjectToQuery(
      params
    )}`;
    const res = await axios.get(fullUrl, {
      withCredentials: true,
    });
    return response(res);
  } catch (error) {
    throw error;
  }
};

export const post = async (
  url: string,
  params?: { [key: string]: any },
  baseUrl?: string
) => {
  try {
    const res = await axios.post((baseUrl ?? _baseUrl) + url, params ?? {}, {
      withCredentials: true,
    });
    return response(res);
  } catch (error) {
    throw error;
  }
};

export const generateQuery = (data: {
  [key: string]: string | undefined | null;
}) => {
  let query = '?';
  for (const key in data) {
    const value = data[key];
    if (value) {
      query += `${key}=${encodeURIComponent(value)}&`;
    }
  }
  return query;
};
