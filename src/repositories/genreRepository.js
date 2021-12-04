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

const getGenres = async () => {
  const genres = await connection.query('SELECT * FROM genres');

  return genres.rows;
};

const getGenreNameById = async ({ genreId }) => {
  const genre = await connection.query('SELECT * FROM genres WHERE id = $1', [
    genreId,
  ]);

  return genre.rowCount ? genre.rows[0].name : false;
};

export { genreExists, createGenre, getGenres, getGenreNameById };
