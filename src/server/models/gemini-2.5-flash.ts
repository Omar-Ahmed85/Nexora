import { streamText, ModelMessage, smoothStream } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: Deno.env.get('GOOGLE_API_KEY')
});

export default function runModel(messages: ModelMessage[]) {
    const model = google('gemini-2.5-flash');
    
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