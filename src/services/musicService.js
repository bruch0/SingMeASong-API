import * as musicSchema from '../schemas/musicSchema.js';
import * as genreRepository from '../repositories/genreRepository.js';
import * as musicRepository from '../repositories/musicRepository.js';
import * as musicGenresRepository from '../repositories/musicGenresRepository.js';
import {
  InvalidBody,
  ConflictMusic,
  GenreNotFound,
  NoMusics,
} from '../errors/musicErrors.js';

const createMusic = async ({ name, link, genres }) => {
  const validation = musicSchema.createMusic.validate({ name, link, genres });

  if (validation.error) throw new InvalidBody();

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

const getRecommendation = async () => {
  const randomChance = () => Math.floor(Math.random() * 10) > 3;
  const randomIndex = (length) => Math.floor(Math.random() * length);

  const musics = await musicRepository.getMusics();
  if (musics.length === 0) throw new NoMusics();

  let filteredMusics;
  let index = randomIndex(musics.length);
  let youtubeLink = musics[index].link;
  let musicId = musics[index].id;

  const lookForWellRated = randomChance();

  if (lookForWellRated) {
    filteredMusics = musics.filter((music) => music.score > 10);
  } else {
    filteredMusics = musics.filter((music) => music.score < 10);
  }

  if (filteredMusics.length) {
    index = randomIndex(filteredMusics.length);
    youtubeLink = filteredMusics[index].link;
    musicId = filteredMusics[index].id;
    delete filteredMusics[index].link;
  }

  const musicGenres = await musicGenresRepository.getMusicGenres({ musicId });
  delete musics[index].link;

  return filteredMusics[index]
    ? { ...filteredMusics[index], genres: musicGenres, youtubeLink }
    : { ...musics[index], genres: musicGenres, youtubeLink };
};

export { createMusic, getRecommendation };
