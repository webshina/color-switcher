import axios from 'axios';

const accessKey = process.env.UNSPLASH_API_ACCESS_KEY;
const secretKey = process.env.UNSPLASH_API_SECRET_KEY;

async function searchPhotos(query: string) {
  const res = await axios(
    `https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=1`,
    {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${accessKey}`,
      },
    }
  );

  return res.data.results[0].urls.small;
}

searchPhotos('ルール')
  .then((url) => {
    console.log(url);
  })
  .catch((err) => {
    console.error(err.response.data.errors);
  });
