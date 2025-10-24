import { Hono } from '@hono/hono';
import createNewUser from '../middleware/newUser.ts';

const newUser = new Hono();

newUser.post('/', createNewUser);

export default newUser;