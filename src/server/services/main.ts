import { Context } from '@hono/hono';
import { StatusCode } from '@hono/hono/utils/http-status';
import { ModelMessage } from 'ai';

export function errorHandler(ctx: Context, message?: string, status?: StatusCode) {
    ctx.status(status || 500);

    return ctx.json({
        status: status || 500,
        message: message || 'Internal Server Error',
        success: false
    });
}

export function successHandler(ctx: Context, data?: object, status?: StatusCode) {
    ctx.status(status || 200);

    return ctx.json({
        status: status || 200,
        data,
        success: true
    });
}

export enum StatusCodes {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export const availableModels = ['deepseek-v3.1', 'gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-5', 'gpt-oss', 'haiku-3.5', 'qwen3-coder'];

export async function routeToModel(model: string, messages: ModelMessage[]) {
    return await import(`../models/${model}.ts`)
        .then((module) => module.default(messages))
        .catch((error) => {
            console.error(error);
            throw new Error(`Error loading model: ${error.message}`);
        });
}