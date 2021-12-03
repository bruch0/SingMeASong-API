import faker from 'faker';

import connection from '../../src/database/database';

const createGenre = async () => {
  await connection.query('INSERT INTO genres (name) VALUES ($1)', [
    faker.music.genre(),
  ]);
};

export { createGenre };
