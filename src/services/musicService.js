import * as musicSchema from '../schemas/musicSchema.js';
import * as genreRepository from '../repositories/genreRepository.js';
import * as musicRepository from '../repositories/musicRepository.js';
import {
  InvalidMusic,
  ConflictMusic,
  GenreNotFound,
} from '../errors/musicErrors.js';

const createMusic = async ({ name, link, genres }) => {
  const validation = musicSchema.createMusic.validate({ name, link, genres });

  if (validation.error) throw new InvalidMusic();

  const alreadyExists = await musicRepository.musicExists({ link });

  if (alreadyExists) throw new ConflictMusic();

  const allGenres = await genreRepository.getGenres();
  const totalGenres = allGenres.length;

  // creates an array from 1 to the last genreId
  const genreIds = Array.apply(null, Array(totalGenres)).map(function (x, i) {
    return i + 1;
  });

  const checkGenres = genres.map((genre) => genreIds.includes(Number(genre)));
  const invalidGenres = checkGenres.includes(false);

  if (invalidGenres) throw new GenreNotFound();

  await musicRepository.createMusic({ name, link, genres });

  return 1;
};

export { createMusic };
