import { Context } from '@hono/hono';
import { StatusCode } from '@hono/hono/utils/http-status';

export function errorHandler(ctx: Context, message?: string, status?: StatusCode) {
    ctx.status(status || 500);

    return ctx.json({
        status: status || 500,
        message: message || 'Internal Server Error',
        success: false
    });
}

export function successHandler(ctx: Context, data?: unknown, status?: StatusCode) {
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