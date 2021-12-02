import connection from '../database/database.js';

const getMusicGenres = async ({ musicId }) => {
  const genres = await connection.query(
    'SELECT  music_genres.id, genres.* FROM music_genres JOIN genres ON music_genres.genre_id = genres.id WHERE  music_genres.music_id = $1',
    [musicId]
  );

  return genres.rows;
};

const getAllMusicGenres = async () => {
  const genres = await connection.query(
    'SELECT music_genres.*, genres.name FROM music_genres JOIN genres ON music_genres.genre_id = genres.id'
  );

  return genres.rows;
};

export { getMusicGenres, getAllMusicGenres };
