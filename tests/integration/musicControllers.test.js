import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import faker from 'faker';

import { clearGenres, clearMusics } from '../utils/clearDatabase.js';
import * as genreRepository from '../../src/repositories/genreRepository.js';

const request = supertest(app);

beforeAll(async () => {
  await clearMusics();
  await clearGenres();
});

describe('POST /recommendation', () => {
  it('should return status 400 when not sending body', async () => {
    const result = await request.post('/recommendations');

    expect(result.status).toEqual(400);
  });

  it('should return status 400 when sending empty body', async () => {
    const result = await request.post('/recommendations').send({});

    expect(result.status).toEqual(400);
  });
});

describe('GET /recommendations/random', () => {
  it('should return status 404 when there is no musics', async () => {
    const result = await request.get('/recommendations/random');

    expect(result.status).toEqual(404);
  });
});

describe('GET /recommendations/top/:amount', () => {
  it('should return status 400 when the amount is smaller than 0', async () => {
    const result = await request.get('/recommendations/top/-1');

    expect(result.status).toEqual(400);
  });

  it('should return status 400 when the amount is 0', async () => {
    const result = await request.get('/recommendations/top/0');

    expect(result.status).toEqual(400);
  });

  it('should return status 200 when the amount is greater than 0', async () => {
    const result = await request.get(
      `/recommendations/top/${faker.datatype.number()}`
    );

    expect(result.status).toEqual(200);
  });
});
