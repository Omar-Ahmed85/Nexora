export type Role = 'system' | 'user' | 'assistant';

export interface ModelMessageClone {
    role: Role;
    content: string;
}

export interface ChatRequest {
    model: string;
    messages: ModelMessageClone[];
};

export interface ModelResponse {
    response?: Response;
    error?: Error;
};