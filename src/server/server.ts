import { Hono } from '@hono/hono';
import { serveStatic } from '@hono/hono/deno';

import chat from './routes/chatRoute.ts';
import { StatusCodes } from './services/main.ts';

const app = new Hono();

app.use('/', serveStatic({ path: './dist/index.html' }));
app.use('/logo.svg', serveStatic({ path: './dist/logo.svg' }));
app.use('/assets/*', serveStatic({ root: './dist/'}));

app.route('/chat', chat);

app.notFound(async (ctx) => {
	const fallback = await Deno.readTextFile('./dist/fallback.html');
	return ctx.html(fallback, StatusCodes.NOT_FOUND);
});

export default app;