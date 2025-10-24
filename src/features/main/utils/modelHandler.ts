import { ModelMessage } from 'ai';
import { ModelResponse } from "@@utils/types.ts";

export const availableModels = ['deepseek-v3.1', 'gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-5', 'gpt-oss', 'haiku-3.5', 'qwen3-coder'];

export async function routeToModel(model: string, messages: ModelMessage[]): Promise<ModelResponse | Error> {
    return await import(`../models/${model}.ts`)
        .then((module) => module.default(messages))
        .catch((error) => {
            console.error(error);
            return new Error(`Error loading model: ${error.message}`);
        });
}