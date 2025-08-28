import { Hono } from '@hono/hono';
import chat from './chatRoute.ts';

const router = new Hono();

router.route('/chat', chat);

export default router;