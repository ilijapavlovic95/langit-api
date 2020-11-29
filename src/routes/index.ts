import { Router } from 'express';
import auth from './auth';
import note from './note';
import user from './user';
import word from './word';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/notes', note);
routes.use('/words', word);

export default routes;
