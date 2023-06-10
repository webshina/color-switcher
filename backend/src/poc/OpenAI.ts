import { Configuration, OpenAIApi } from 'openai';

const openAiApi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

async function summarizeArticle(article: string) {
  // Check that the article isn't longer than the API's character limit
  if (article.length > 2048) {
    throw new Error('Article exceeds character limit for API.');
  }

  const response = await openAiApi.createCompletion({
    model: 'text-davinci-003',
    prompt: `Summarize the following article:\n\n${article}\n\nSummary:`,
    temperature: 0.7,
    max_tokens: 256,
  });

  // Extract and format the choices from the response
  const summary = response.data.choices[0];
  return summary;
}

const article = `Bitcoin's (BTC) options market is showing bias for weakness over six months for the first time since early March as the U.S. debt ceiling drama continues.
The six-month call-put skew, which measures the difference between what investors are willing to pay for bullish calls and bearish puts expiring in 180 days, has declined to -1, the lowest since March 13, according to data from leading crypto options exchange Deribit, tracked by Amberdata.
Puts refer to a type of option that increases in value as prices of the underlying asset fall. This gives their holder the right, but not the obligation, to sell an asset at a predetermined date at a specific price, effectively allowing them to bet against whichever asset that put option tracks.
`; // Replace this with your article

summarizeArticle(article)
  .then((summary) => {
    console.log('Summary:');
    console.log(summary);
  })
  .catch((error) => {
    console.log('Error:');
    console.error(error);
  });
