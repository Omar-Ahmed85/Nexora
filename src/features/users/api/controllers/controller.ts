import { Hono } from '@hono/hono';

import getUser from '../routes/getUserRoute.ts';
import newUser from '../routes/newUserRoute.ts';

const usersController = new Hono();

usersController.route('/get-user', getUser);
usersController.route('/new-user', newUser);

export default usersController;