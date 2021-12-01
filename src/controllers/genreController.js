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

  res.status(200).send('Gênero criado');
};

export { createGenre };
