import { streamText, ModelMessage, smoothStream } from 'ai';
import { ModelResponse } from '../../types/chat.ts';

export default function runModel(messages: ModelMessage[]): ModelResponse {
    try {
        const response = streamText({
            model: 'anthropic/claude-3.5-haiku',
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