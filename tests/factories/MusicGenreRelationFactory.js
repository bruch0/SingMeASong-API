import faker from 'faker';

import connection from '../../src/database/database';

const createMusicGenreRelation = async () => {
  await connection.query(
    'INSERT INTO music_genres (music_id, genre_id) VALUES (1, 1)'
  );
};

export { createMusicGenreRelation };
