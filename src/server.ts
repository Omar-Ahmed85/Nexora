import { Hono } from '@hono/hono';
import { serveStatic } from '@hono/hono/deno';

import chat from './features/main/api/routes/chatRoute.ts';
import usersController from './features/users/api/controllers/controller.ts';

import { StatusCodes } from '@@utils/main.ts';

const app = new Hono();

app.use('/*', serveStatic({
	root: './dist/'
}));

app.route('/chat', chat);
app.route('/users', usersController);

const fallback = await Deno.readTextFile('./dist/fallback.html');
app.notFound((ctx) => {
	return ctx.html(fallback, StatusCodes.NOT_FOUND);
});

export default app;