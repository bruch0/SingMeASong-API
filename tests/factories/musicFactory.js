import faker from 'faker';

import connection from '../../src/database/database';

const createMusic = async () => {
  await connection.query(
    'INSERT INTO musics (name, link, score) VALUES ($1, $2, $3)',
    [
      faker.datatype.string(10),
      `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
      0,
    ]
  );
};

export { createMusic };
