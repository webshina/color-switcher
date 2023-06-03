import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function execute(prompt: string) {
  // Check that the article isn't longer than the API's character limit
  if (prompt.length > 2048) {
    throw new Error('Prompt exceeds character limit');
  }

  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '1024x1024',
  });

  return response.data.data;
}

const prompt = '新メンバーが自己紹介を投稿する場';
execute(prompt)
  .then((result) => {
    console.log('Summary:');
    console.log(result);
  })
  .catch((error) => {
    console.log('Error:');
    console.error(error);
  });
