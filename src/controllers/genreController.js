import * as genreService from '../services/genreService.js';

const createGenre = async (req, res) => {
  const { name } = req.body;

  const success = genreService.createGenre({ name });

  if (success === -1)
    return res
      .status(400)
      .send('Gênero inválido, insira um gênero entre 3 e 20 caractéres');

  res.status(200).send('Gênero criado');
};

export { createGenre };
