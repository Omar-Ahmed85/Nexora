import { streamText, ModelMessage, smoothStream } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openRouter = createOpenRouter({
    apiKey: Deno.env.get('OPENROUTER_API_KEY')
});

export default function runModel(messages: ModelMessage[]) {
    const model = openRouter('qwen/qwen3-coder:free');

    const response = streamText({
        model,
        messages,
        experimental_transform: smoothStream(),
        onError: ({ error }) => {
            console.error(error);
        }
    });

    return response.toTextStreamResponse();
}