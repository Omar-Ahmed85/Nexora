import { Context } from '@hono/hono';

import { ChatRequest, ModelResponse } from '../../../../utils/types.ts';
import { errorHandler, StatusCodes } from '../../../../utils/main.ts';
import { routeToModel, availableModels } from '../../utils/modelHandler.ts';

export default async function chat(ctx: Context) {
    try {

        const { model, messages } = await ctx.req.json<ChatRequest>();
    
        if (!model || !messages) {
            return errorHandler(ctx, 'Invalid Request', StatusCodes.BAD_REQUEST);
        }
    
        if (availableModels.includes(model) === false) {
            return errorHandler(ctx, 'Model Not Found', StatusCodes.NOT_FOUND);
        }

        const res: ModelResponse = await routeToModel(model, messages);

        if (res.error) {
            return errorHandler(ctx, res.error.message, StatusCodes.INTERNAL_SERVER_ERROR);
        }

        return res.response;

    } catch (_error) {
        return errorHandler(ctx, 'Error Processing Request', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}