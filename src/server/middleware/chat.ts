import { Context } from '@hono/hono';

import { ChatRequest } from '../../types/chat.ts';
import { StatusCodes, errorHandler, successHandler, routeToModel, availableModels } from '../services/main.ts';

export default async function chat(ctx: Context) {
    try {

        const { model, messages } = await ctx.req.json<ChatRequest>();
    
        if (!model || !messages) {
            return errorHandler(ctx, 'Invalid Request', StatusCodes.BAD_REQUEST);
        }
    
        if (availableModels.includes(model) === false) {
            return errorHandler(ctx, 'Model Not Found', StatusCodes.NOT_FOUND);
        }
    
        const data: Response = await routeToModel(model, messages);
        const response = await data.text();
        
        return successHandler(ctx, { response }, StatusCodes.OK);

    } catch (_error) {
        return errorHandler(ctx, 'Error Processing Request', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}