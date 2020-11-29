import { Router } from 'express';
import { NoteController } from '../controller/NoteController';

const router = Router();
//Login route
router.get('/', NoteController.getAll);
router.post('/', NoteController.create);
router.get('/:noteId', NoteController.getNote);
router.patch('/:noteId', NoteController.updateNote);
router.delete('/:noteId', NoteController.deleteNote);

export default router;
