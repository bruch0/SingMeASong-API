import * as genreRepository from '../repositories/genreRepository.js';
import * as genreSchema from '../schemas/genreSchema.js';

const createGenre = async ({ name }) => {
  const validation = genreSchema.createGenre.validate({ name });

  if (validation.error) return -1;

  const capitalizedName = name.replace(/(^\w|\s\w)/g, (letter) =>
    letter.toUpperCase()
  );

  const genreExists = await genreRepository.genreExists({
    name: capitalizedName,
  });

  if (genreExists) return 0;

  await genreRepository.createGenre({ name: capitalizedName });

  return 1;
};

export { createGenre };
