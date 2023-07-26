import axios, { isAxiosError } from 'axios';

export const createCompletion = async (props: {
  prompt: string;
  maxTokens?: number;
}) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      data: {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: props.prompt,
          },
        ],
      },
    });

    const result = res.data.choices[0].message.content;

    if (!result) {
      throw new Error('Open AI response is empty');
    } else if (typeof result !== 'string') {
      throw new Error('Open AI response is not a string');
    }

    return result as string;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error.message);
    }
  }
};
