import { Router } from 'express';
import 'express-group-routes';
import * as musicController from '../controllers/musicController.js';

const router = new Router();

router.group('/recommendations', (route) => {
  route.get('/random', musicController.getRecommendation);
  route.get('/top/:limit', musicController.getTopMusics);
  route.get('/top/random');
  route.post('', musicController.createMusic);
  route.post('/:musicId/upvote', musicController.voteMusic);
  route.post('/:musicId/downvote', musicController.voteMusic);
});

export default router;
