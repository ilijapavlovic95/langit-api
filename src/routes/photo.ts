import { checkJwt } from './../middleware/checkJwt';
import { PhotoController } from './../controller/PhotoController';
import { Router } from 'express';
import * as multer from 'multer';
import * as path from 'path';
const router = Router();

// multer initializing
const upload = multer({
  dest: path.join(__dirname, 'public')
});

// add new photo
router.post('/', [checkJwt], upload.single('photo'), PhotoController.newPhoto);

export default router;
