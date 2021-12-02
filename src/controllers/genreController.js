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
    next(error);
  }
};

export { createGenre, getGenres };
