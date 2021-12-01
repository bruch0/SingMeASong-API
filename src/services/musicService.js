import * as musicRepository from '../repositories/musicRepository.js';

const createMusic = async ({ name, link }) => {
  const alreadyExists = await musicRepository.musicExists({ name });

  if (alreadyExists) return 0;

  await musicRepository.createMusic({ name, link });

  return 1;
};

export { createMusic };
