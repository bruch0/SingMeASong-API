import * as genreRepository from '../repositories/genreRepository.js';
import * as musicRepository from '../repositories/musicRepository.js';
import * as musicGenresRepository from '../repositories/musicGenresRepository.js';
import * as genreSchema from '../validations/genreSchema.js';
import {
  InvalidGenre,
  ConflictGenre,
  NoGenres,
  GenreNotFound,
} from '../errors/genreErrors.js';
import { NoMusics } from '../errors/musicErrors.js';

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
  const genres = await genreRepository.getGenres();

  if (genres.length === 0) throw new NoGenres();

  return genres;
};

const getAllMusicsByGenre = async ({ genreId }) => {
  const allMusicGenres = await musicGenresRepository.getAllMusicGenres();

  if (!allMusicGenres.length) throw new NoMusics();

  const musicsIds = allMusicGenres.filter(
    (musicGenre) => musicGenre.genre_id === Number(genreId)
  );

  if (!musicsIds.length) throw new GenreNotFound();

  const allMusics = await musicRepository.getMusics();

  const genreMusics = allMusicGenres.filter(
    (music) => music.genre_id === Number(genreId)
  );

  const musicIds = genreMusics.map((musicGenre) => musicGenre.music_id);

  const genreName = await genreRepository.getGenreNameById({ genreId });
  let totalScore = 0;
  const recommendations = [];

  allMusics.forEach((music) => {
    if (musicIds.includes(music.id)) {
      recommendations.push(music);
    }
  });

  recommendations.forEach((recommendation) => {
    const musicGenres = allMusicGenres.filter(
      (musicGenre) => musicGenre.music_id === recommendation.id
    );

    musicGenres.forEach((genre) => {
      genre.id = genre.genre_id;
      delete genre.music_id;
      delete genre.genre_id;
    });

    recommendation.genres = musicGenres;
    recommendation.youtubeLink = recommendation.link;
    delete recommendation.link;

    totalScore += recommendation.score;
  });

  return {
    id: Number(genreId),
    name: genreName,
    score: totalScore,
    recommendations,
  };
};

export { createGenre, getGenres, getAllMusicsByGenre };
