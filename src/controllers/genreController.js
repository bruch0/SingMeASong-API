import * as genreService from '../services/genreService.js';

const createGenre = async (req, res, next) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(400)
      .send('Você deve enviar um objeto no padrão {name: nomeDoGenero}');

  try {
    await genreService.createGenre({ name });

    res.status(201).send('Gênero criado');
  } catch (error) {
    if (error.name === 'invalidGenre')
      return res.status(400).send(error.message);

    if (error.name === 'conflictGenre')
      return res.status(409).send(error.message);

    next(error);
  }
};

const getGenres = async (req, res, next) => {
  try {
    const genres = await genreService.getGenres();

    return res.send(genres);
  } catch (error) {
    if (error.name === 'noGenres') return res.status(404).send(error.message);

    next(error);
  }
};

const getAllMusicsByGenre = async (req, res, next) => {
  const { genreId } = req.params;

  if (!genreId || genreId < 1)
    return res.status(400).send('Insira um id de gênero válido');

  try {
    const musics = await genreService.getAllMusicsByGenre({ genreId });

    return res.send(musics);
  } catch (error) {
    if (error.name === 'noMusics') return res.status(404).send(error.message);
    if (error.name === 'genreNotFound')
      return res.status(404).send(error.message);

    next(error);
  }
};

export { createGenre, getGenres, getAllMusicsByGenre };
