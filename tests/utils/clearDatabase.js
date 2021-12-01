import connection from '../../src/database/database';

const clearGenres = async () => {
  await connection.query('DELETE FROM genres');
};

export { clearGenres };
