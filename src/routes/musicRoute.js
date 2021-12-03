import { Router } from 'express';
import 'express-group-routes';
import * as musicController from '../controllers/musicController.js';

const router = new Router();

router.group('/recommendations', (route) => {
  route.post('', musicController.createMusic);
  route.get('/random', musicController.getRecommendation);
  route.get('/top/:limit', musicController.getTopMusics);
  route.get('/top/random');
});

export default router;
