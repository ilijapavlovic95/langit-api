import { Router } from 'express';
import { NoteController } from '../controller/NoteController';

const router = Router();
//Login route
router.post('/', NoteController.create);

export default router;
