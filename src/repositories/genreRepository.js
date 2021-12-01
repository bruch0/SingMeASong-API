import connection from '../database/database.js';

const genreExists = async ({ name }) => {
  const genres = await connection.query(
    'SELECT * FROM genres WHERE name = $1',
    [name]
  );

  return Boolean(genres.rows.length);
};

const createGenre = async ({ name }) => {
  await connection.query('INSERT INTO genres (name) values ($1)', [name]);

  return true;
};

export { genreExists, createGenre };
