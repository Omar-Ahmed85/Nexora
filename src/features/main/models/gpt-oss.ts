import { streamText, ModelMessage, smoothStream } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

import { ModelResponse } from "@@utils/types.ts";

const nim = createOpenAICompatible({
    name: 'nim',
    apiKey: Deno.env.get('NVIDIA_API_KEY'),
    baseURL: 'https://integrate.api.nvidia.com/v1'
});

export default function runModel(messages: ModelMessage[]): ModelResponse {
    try {
        const model = nim('openai/gpt-oss-120b');
    
        const response = streamText({
            model,
            messages,
            experimental_transform: smoothStream(),
            maxOutputTokens: 4096
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