import { createOpenAI } from '@ai-sdk/openai';  
import { streamText } from 'ai';

const openrouter = createOpenAI({  // Added this block
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id } = await req.json();
  console.log('chat id', id);
  
  const result = streamText({
    model: openrouter('openai/gpt-3.5-turbo'), // More reliable free option'),
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // implement your own logic here
    },
  });
  
  return result.toDataStreamResponse();
}
