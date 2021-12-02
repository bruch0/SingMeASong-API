import connection from '../../src/database/database';

const clearGenres = async () => {
  await connection.query('DELETE FROM genres');
};

const clearMusics = async () => {
  await connection.query('TRUNCATE musics CASCADE');
};

export { clearGenres, clearMusics };
