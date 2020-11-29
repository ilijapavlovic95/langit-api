import { Router } from 'express';
import { WordController } from '../controller/WordController';

const router = Router();
//Login route
router.get('/', WordController.getAll);
router.post('/', WordController.create);
// router.get('/:wordId', WordController.getWord);
router.patch('/:wordId', WordController.updateWord);
router.patch(
  '/:wordId/translation/:translationId',
  WordController.updateTranslation
);
router.delete(
  '/:wordId/translation/:translationId',
  WordController.deleteTranslation
);
// router.delete('/:wordId', WordController.deleteNote);

export default router;
