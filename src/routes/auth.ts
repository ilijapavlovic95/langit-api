import { AuthController } from './../controller/AuthController';
import { Router } from 'express';
import { checkJwt } from '../middleware/checkJwt';

const router = Router();
//Login route
router.post('/login', AuthController.login);

export default router;
