import express from 'express';
import cors from 'cors';

import databaseError from './middlewares/databaseError.js';
import * as genreController from './controllers/genreController.js';

const app = express();
app.use(express.json());
app.use(cors());

app
  .route('/genres')
  .post(genreController.createGenre)
  .get(genreController.getGenres);

app.use(databaseError);

export default app;
