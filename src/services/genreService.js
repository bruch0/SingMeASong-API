import * as genreRepository from '../repositories/genreRepository.js';
import * as genreSchema from '../schemas/genreSchema.js';

const createGenre = async ({ name }) => {
  const validation = genreSchema.createGenre({ name });

  if (validation.error) return -1;

  await genreRepository.createGenre({ name });

  return 1;
};

export { createGenre };
