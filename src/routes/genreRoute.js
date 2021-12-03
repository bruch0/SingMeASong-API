import { Router } from 'express';
import 'express-group-routes';
import * as genreController from '../controllers/genreController.js';

const router = new Router();

router.group('/genres', (route) => {
  route.get('', genreController.getGenres);
  route.post('', genreController.createGenre);
});

export default router;
