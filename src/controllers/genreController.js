import * as genreService from '../services/genreService.js';

const createGenre = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(400)
      .send('Você deve enviar um objeto no padrão {name: nomeDoGenero}');

  const success = await genreService.createGenre({ name });

  if (success === -1)
    return res
      .status(400)
      .send('Gênero inválido, insira um gênero entre 3 e 20 caractéres');

  if (!success) return res.status(403).send('Esse gênero já existe');

  res.status(201).send('Gênero criado');
};

const getGenres = async (req, res) => {
  const genres = await genreService.getGenres();

  return res.send(genres);
};

export { createGenre, getGenres };
