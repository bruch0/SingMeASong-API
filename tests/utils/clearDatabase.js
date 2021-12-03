import connection from '../../src/database/database';

const clearGenres = async () => {
  await connection.query('TRUNCATE genres RESTART IDENTITY CASCADE');
};

const clearMusics = async () => {
  await connection.query('TRUNCATE musics RESTART IDENTITY CASCADE');
};

export { clearGenres, clearMusics };
