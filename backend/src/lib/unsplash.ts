import { isAxiosError } from '@/utils/typeNarrower';
import axios from 'axios';

export const fetchImageFromUnsplash = async (
  query: string,
  size: 'regular' | 'small' = 'regular'
) => {
  try {
    const res = await axios(
      `https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=1`,
      {
        method: 'GET',
        headers: {
          'Accept-Version': 'v1',
          Authorization: `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY}`,
        },
      }
    );

    return res.data.results[0].urls[size];
  } catch (e) {
    if (isAxiosError(e)) {
      return null;
    }
  }
};
