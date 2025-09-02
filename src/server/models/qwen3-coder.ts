import { streamText, ModelMessage, smoothStream } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

import { ModelResponse } from '../../types/chat.ts';

const openRouter = createOpenRouter({
    apiKey: Deno.env.get('OPENROUTER_API_KEY')
});

export default function runModel(messages: ModelMessage[]): ModelResponse {
    try {
        const model = openRouter('qwen/qwen3-coder:free');

        const response = streamText({
            model,
            messages,
            experimental_transform: smoothStream(),
            maxOutputTokens: 2048
        });

        return {
            response: response.toTextStreamResponse()
        }

    } catch (error) {
        return {
            error: error as Error
        }
    }
}