import connection from '../database/database.js';

const createGenre = ({ name }) => {
  connection.query('INSERT INTO genres (name) values ($1)', [name]);
};

export { createGenre };
