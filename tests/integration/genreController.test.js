import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import faker from 'faker';

import { clearGenres } from '../utils/clearDatabase.js';
import * as genreController from '../../src/controllers/genreController.js';

const request = supertest(app);

beforeAll(clearGenres);

describe('POST /genres', () => {
  const validBody = {
    name: faker.music.genre(),
  };

  it('should return status 400 when not sending body', async () => {
    const result = await request.post('/genres');

    expect(result.status).toEqual(400);
  });

  it('should return status 400 when sending empty body', async () => {
    const result = await request.post('/genres').send({});

    expect(result.status).toEqual(400);
  });

  it('should return status 400 when sending name smaller than 3', async () => {
    const body = {
      name: faker.datatype.string(2),
    };
    const result = await request.post('/genres').send(body);

    expect(result.status).toEqual(400);
  });

  it('should return status 400 when sending name greater than 20', async () => {
    const body = {
      name: faker.datatype.string(21),
    };
    const result = await request.post('/genres').send(body);

    expect(result.status).toEqual(400);
  });

  it('should return status 201 on valid non registered genre', async () => {
    const result = await request.post('/genres').send(validBody);

    expect(result.status).toEqual(201);
  });

  it('should return status 403 on valid registered genre', async () => {
    const result = await request.post('/genres').send(validBody);

    expect(result.status).toEqual(403);
  });
});

describe('GET /genres', () => {
  it('should return status 200', async () => {
    const result = await request.get('/genres');

    expect(result.status).toEqual(200);
  });
});
