import express from 'express';
import cors from 'cors';

import genreRoute from './routes/genreRoute.js';
import musicRoute from './routes/musicRoute.js';
import databaseError from './middlewares/databaseError.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(genreRoute);
app.use(musicRoute);

app.use(databaseError);

export default app;
