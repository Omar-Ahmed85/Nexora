import { streamText, ModelMessage, smoothStream } from 'ai';

export default function runModel(messages: ModelMessage[]) {
    const response = streamText({
        model: 'anthropic/claude-3.5-haiku',
        messages,
        experimental_transform: smoothStream(),
        onError: ({ error }) => {
            console.error(error);
        }
    });

    return response.toTextStreamResponse();
}