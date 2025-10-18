import { streamText, ModelMessage, smoothStream } from 'ai';
import { ModelResponse } from '../../../utils/types.ts';

export default function runModel(messages: ModelMessage[]): ModelResponse {
    try {
        const response = streamText({
            model: 'openai/gpt-5',
            messages,
            experimental_transform: smoothStream(),
            maxOutputTokens: 1024
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