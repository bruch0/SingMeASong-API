import * as genreRepository from '../repositories/genreRepository.js';
import * as genreSchema from '../schemas/genreSchema.js';
import { InvalidGenre, ConflictGenre } from '../errors/genreErrors.js';

const createGenre = async ({ name }) => {
  const validation = genreSchema.createGenre.validate({ name });

  if (validation.error) throw new InvalidGenre();

  const capitalizedName = name.replace(/(^\w|\s\w)/g, (letter) =>
    letter.toUpperCase()
  );

  const genreExists = await genreRepository.genreExists({
    name: capitalizedName,
  });

  if (genreExists) throw new ConflictGenre();

  await genreRepository.createGenre({ name: capitalizedName });

  return 1;
};

const getGenres = async () => {
  const genres = genreRepository.getGenres();

  return genres;
};

export { createGenre, getGenres };
