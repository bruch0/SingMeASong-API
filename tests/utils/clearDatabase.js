import connection from '../../src/database/database';

const clearGenres = async () => {
  await connection.query('TRUNCATE genres RESTART IDENTITY');
};

const clearMusics = async () => {
  await connection.query('TRUNCATE musics CASCADE RESTART IDENTITY');
};

export { clearGenres, clearMusics };
