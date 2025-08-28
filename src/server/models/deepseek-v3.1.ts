import { streamText, ModelMessage, smoothStream } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';

const deepseek = createDeepSeek({
    apiKey: Deno.env.get('DEEPSEEK_API_KEY')
});

export default function runChat(messages: ModelMessage[]) {
    const model = deepseek('deepseek-chat');

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