import { streamText, ModelMessage, smoothStream } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

import { ModelResponse } from '../../types/chat.ts';

const nim = createOpenAICompatible({
    name: 'nim',
    apiKey: Deno.env.get('NVIDIA_API_KEY'),
    baseURL: 'https://integrate.api.nvidia.com/v1'
});

export default function runModel(messages: ModelMessage[]): ModelResponse {

    try {
        const model = nim('deepseek-ai/deepseek-v3.1');
    
        const response = streamText({
            model,
            messages,
            experimental_transform: smoothStream()
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