import connection from '../database/database.js';

const createGenre = async ({ name }) => {
  await connection.query('INSERT INTO genres (name) values ($1)', [name]);

  return true;
};

export { createGenre };
