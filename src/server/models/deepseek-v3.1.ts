import { streamText, ModelMessage, smoothStream } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const nim = createOpenAICompatible({
    name: 'nim',
    apiKey: Deno.env.get('NVIDIA_API_KEY'),
    baseURL: 'https://integrate.api.nvidia.com/v1'
});

export default function runModel(messages: ModelMessage[]) {
    const model = nim('deepseek-ai/deepseek-v3.1');

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