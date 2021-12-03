import connection from '../database/database.js';

const musicExists = async ({ link }) => {
  const musics = await connection.query(
    'SELECT * FROM musics WHERE link = $1',
    [link]
  );

  return Boolean(musics.rowCount);
};

const createMusic = async ({ name, link, genres }) => {
  const resultId = await connection.query(
    'INSERT INTO musics (name, link, score) VALUES ($1, $2, 0) RETURNING id',
    [name, link]
  );

  const id = resultId.rows[0].id;

  genres.forEach((genre) =>
    connection.query(
      'INSERT INTO music_genres (music_id, genre_id) VALUES ($1, $2)',
      [id, genre]
    )
  );

  return true;
};

const getMusics = async () => {
  const musics = await connection.query('SELECT * FROM musics');

  return musics.rows;
};

const getTopMusics = async ({ limit }) => {
  const musics = await connection.query(
    'SELECT * FROM musics ORDER BY score DESC LIMIT $1',
    [limit]
  );

  return musics.rows;
};

const getMusicScore = async ({ musicId }) => {
  const score = await connection.query('SELECT * FROM musics WHERE id = $1', [
    musicId,
  ]);

  return score.rowCount ? { musicScore: score.rows[0].score } : false;
};

const removeMusic = async ({ musicId }) => {
  await connection.query('DELETE FROM musics WHERE id = $1', [musicId]);
};

const updateMusicScore = async ({ newScore, musicId }) => {
  await connection.query('UPDATE musics SET score = $1 WHERE id = $2', [
    newScore,
    musicId,
  ]);
};

export {
  musicExists,
  createMusic,
  getMusics,
  getTopMusics,
  getMusicScore,
  removeMusic,
  updateMusicScore,
};
