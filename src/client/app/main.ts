import './ui.ts';
import { updateNotification, handleModelResponse } from './ui.ts';
import type { Role, ChatRequest, ModelMessageClone } from '@@utils/types.ts';

let counter = 0;

export async function runChat(model: string, prompt: string) {

    try {
        
        const messages = storeMessage('user', prompt);

        if (!messages) {
            updateNotification('Failed to store the message(s)', 'error');

            setTimeout(() => {
                updateNotification('');
            }, 3000);

            return;
        }

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                model,
                messages
            } as ChatRequest)
        };
    
        const response = await fetch('/chat', options);

        if (!response.ok) {
            updateNotification('Failed to get the model response. Please try a different model', 'error');

            setTimeout(() => {
                updateNotification('');
            }, 3000);

            return;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let hasEnded: boolean = false;
    
        let fullResponse = '';
    
        while (true) {
            const state = await reader?.read();
            hasEnded = state?.done!;

            if (hasEnded) {
                await handleModelResponse(undefined, counter, hasEnded, fullResponse);
            }
            
            if (state?.done) {
                storeMessage('assistant', fullResponse);
                counter += 1;

                break;
            }
    
            const chunk = decoder.decode(state?.value, { stream: true });
            fullResponse += chunk;
            
            await handleModelResponse(chunk, counter, hasEnded, fullResponse);
        }

    } catch (_error) {
        updateNotification('There is a problem from our side. Please, try another model', 'error');

        setTimeout(() => {
            updateNotification('');
        }, 3000);

        return;
    }
}

function storeMessage(role: Role, prompt: string): ModelMessageClone[] {
    try {
        const currentStorage: string | JSON = sessionStorage.getItem('messages') || '[]';
        const messages: ModelMessageClone[] = JSON.parse(currentStorage);
    
        messages.push({ role, content: prompt });
        sessionStorage.setItem('messages', JSON.stringify(messages));
    
        return JSON.parse(sessionStorage.getItem('messages')!);

    } catch (_error) {
        return [];
    }
}