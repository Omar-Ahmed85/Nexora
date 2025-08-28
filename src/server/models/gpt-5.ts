import { streamText, ModelMessage, smoothStream } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
    apiKey: Deno.env.get('OPENAI_API_KEY')
});

export default function runChat(messages: ModelMessage[]) {
    const model = openai('gpt-5');

    const result = streamText({
        model,
        messages,
        experimental_transform: smoothStream(),
        onError: ({ error }) => {
            console.error(error);
        }
    });

    return result.toTextStreamResponse();
}