import { Context } from '@hono/hono';
import { StatusCode } from '@hono/hono/utils/http-status';

import { ChatRequest, ModelResponse } from '@@utils/types.ts';
import { errorHandler, StatusCodes, tryCatch } from '@@utils/main.ts';
import { routeToModel, availableModels } from '../../utils/modelHandler.ts';

export default async function chat(ctx: Context) {
    // Parse Request
    const [error, data] = await tryCatch(ctx.req.json<ChatRequest>());
    if (error || !data) {
        return errorHandler(ctx, 'Error Processing Request. Please try a different model', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    // Validate Request
    const [isValid, code, message] = validateRequest(data);
    if (!isValid) {
        return errorHandler(ctx, message, code);
    }

    // Handle Request
    const [isOk, response] = await handleRequest(data);
    if (!isOk) {
        return errorHandler(ctx, response as string, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    return response;
}

function validateRequest({ model, messages }: ChatRequest): [boolean, StatusCode?, string?] {
    if (!model || !messages) {
        return [false, StatusCodes.BAD_REQUEST, 'Invalid Request -- (Please provide both the model and the messages)'];
    }
    if (!availableModels.includes(model)) {
        return [false, StatusCodes.NOT_FOUND, 'AI model not found. Please try a different model'];
    }
    return [true];
}

async function handleRequest({ model, messages }: ChatRequest): Promise<[boolean, string | Response]> {
    const [err, res] = await tryCatch(routeToModel(model, messages));
    if (err || Error.isError(res)) {
        return [false, 'Error Processing Request. Please try a different model'];
    }
    
    const { response, error } = res as ModelResponse;
    if (error) {
        return [false, error?.message];
    }
    return [true, response!];
}