import { createCompletion } from '@/lib/openAI';

async function summarizeArticle(article: string) {
  // Check that the article isn't longer than the API's character limit
  if (article.length > 2048) {
    throw new Error('Article exceeds character limit for API.');
  }

  const result = await createCompletion({
    prompt: `Summarize the following article:\n\n${article}\n\nSummary:`,
    maxTokens: 256,
  });

  return result;
}

const article = `Bitcoin's (BTC) options market is showing bias for weakness over six months for the first time since early March as the U.S. debt ceiling drama continues.
The six-month call-put skew, which measures the difference between what investors are willing to pay for bullish calls and bearish puts expiring in 180 days, has declined to -1, the lowest since March 13, according to data from leading crypto options exchange Deribit, tracked by Amberdata.
Puts refer to a type of option that increases in value as prices of the underlying asset fall. This gives their holder the right, but not the obligation, to sell an asset at a predetermined date at a specific price, effectively allowing them to bet against whichever asset that put option tracks.
`; // Replace this with your article

summarizeArticle(article).then((summary) => {
  console.log('Summary:');
  console.log(summary);
});
