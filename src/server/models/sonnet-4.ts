import { streamText, ModelMessage, smoothStream } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';

const anthropic = createAnthropic({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY')
});

export default function runChat(messages: ModelMessage[]) {
    const model = anthropic('claude-sonnet-4-20250514');

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