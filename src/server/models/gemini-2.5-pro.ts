import { streamText, ModelMessage, smoothStream } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

import { ModelResponse } from '../../types/chat.ts';

const google = createGoogleGenerativeAI({
    apiKey: Deno.env.get('GOOGLE_API_KEY')
});

export default function runModel(messages: ModelMessage[]): ModelResponse {
    try {
        const model = google('gemini-2.5-pro');
    
        const response = streamText({
            model,
            messages,
            experimental_transform: smoothStream(),
            maxOutputTokens: 2048
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