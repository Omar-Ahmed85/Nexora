import { streamText, ModelMessage, smoothStream } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const nim = createOpenAICompatible({
    name: 'nim',
    apiKey: Deno.env.get('NVIDIA_API_KEY'),
    baseURL: 'https://integrate.api.nvidia.com/v1'
});

export default function runModel(messages: ModelMessage[]) {
    const model = nim('openai/gpt-oss-120b');

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