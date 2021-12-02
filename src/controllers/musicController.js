import * as musicService from '../services/musicService.js';

const createMusic = async (req, res, next) => {
  const { name, link, genres } = req.body;

  if (!name || !link)
    return res
      .status(400)
      .send(
        'Você deve enviar um objeto no padrão {name: nomeDaMusica, link: urlDoYoutube, genres: [id]}'
      );

  try {
    await musicService.createMusic({ name, link, genres });

    return res.status(200).send('Música registrada com sucesso');
  } catch (error) {
    if (error.name === 'invalidUrl') return res.status(400).send(error.message);
    if (error.name === 'conflictMusic')
      return res.status(409).send(error.message);
    if (error.name === 'genreNotFound')
      return res.status(404).send(error.message);

    next();
  }
};

export { createMusic };