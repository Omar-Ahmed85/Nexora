import { ModelMessage } from 'ai';

export type Role = 'system' | 'user' | 'assistant';

export interface ChatRequest {
    model: string;
    messages: ModelMessage[];
};

export interface ModelResponse {
    response?: Response;
    error?: Error;
}