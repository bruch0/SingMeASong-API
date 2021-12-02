import express from 'express';
import 'express-group-routes';
import cors from 'cors';

import databaseError from './middlewares/databaseError.js';
import * as genreController from './controllers/genreController.js';
import * as musicController from './controllers/musicController.js';

const app = express();
app.use(express.json());
app.use(cors());

app
  .route('/genres')
  .get(genreController.getGenres)
  .post(genreController.createGenre);

app.post('/recommendations', musicController.createMusic);

app.group('/recommendations', (router) => {
  router.get('/random', musicController.getRecommendation);
});

// app.get('/recommendations/random', musicController.getRecommendation);

app.get('/recommendations/top/random');

app.use(databaseError);

export default app;
