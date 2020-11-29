import { Router } from 'express';
import auth from './auth';
import note from './note';
import user from './user';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/notes', note);

export default routes;
