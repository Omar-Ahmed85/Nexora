import { streamText, ModelMessage, smoothStream } from 'ai';

export default function runChat(messages: ModelMessage[]) {
    const result = streamText({
        model: 'google/gemini-2.5-pro',
        messages,
        experimental_transform: smoothStream(),
        onError: ({ error }) => {
            console.error(error);
        }
    });

    return result.toTextStreamResponse();
}