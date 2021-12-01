import connection from '../database/database.js';

const createMusic = async ({ name, link }) => {
  await connection.query(
    'INSERT INTO musics (name, link, score) VALUES ($1, $2, 0)',
    [name, link]
  );

  return true;
};

export { createMusic };
