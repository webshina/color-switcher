import { createCompletion } from '@/lib/openAI';

async function summarizeArticle(prompt: string) {
  const result = await createCompletion({
    prompt,
    maxTokens: 1024,
  });

  return result;
}

const prompt = `Summarize 2020 in 100 words.`;
summarizeArticle(prompt).then((summary) => {
  console.log(summary);
});
