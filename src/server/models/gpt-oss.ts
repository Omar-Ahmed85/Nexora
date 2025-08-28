import { streamText, ModelMessage, smoothStream } from 'ai';
import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({
    apiKey: Deno.env.get('GROQ_API_KEY')
});

export default function runChat(messages: ModelMessage[]) {
    const model = groq('openai/gpt-oss-120b');

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