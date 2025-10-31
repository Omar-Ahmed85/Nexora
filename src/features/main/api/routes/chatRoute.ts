import { Hono } from '@hono/hono';
import chatFunction from '../middleware/chat.ts';

const chat = new Hono();

chat.post('/', chatFunction);

export default chat;