import connection from '../database/database.js';

const musicExists = async ({ link }) => {
  const musics = await connection.query(
    'SELECT * FROM musics WHERE link = $1',
    [link]
  );

  return Boolean(musics.rowCount);
};

const createMusic = async ({ name, link }) => {
  await connection.query(
    'INSERT INTO musics (name, link, score) VALUES ($1, $2, 0)',
    [name, link]
  );

  return true;
};

export { musicExists, createMusic };
