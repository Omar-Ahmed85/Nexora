import { streamText, ModelMessage, smoothStream } from 'ai';
import { ModelResponse } from '../../types/chat.ts';

export default function runModel(messages: ModelMessage[]): ModelResponse {
    try {
        const response = streamText({
            model: 'openai/gpt-5',
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