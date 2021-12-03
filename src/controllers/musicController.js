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
    if (error.name === 'invalidBody')
      return res.status(400).send(error.message);
    if (error.name === 'conflictMusic')
      return res.status(409).send(error.message);
    if (error.name === 'genreNotFound')
      return res.status(404).send(error.message);

    next();
  }
};

const getRecommendation = async (req, res, next) => {
  try {
    const music = await musicService.getRecommendation();

    return res.status(200).send(music);
  } catch (error) {
    if (error.name === 'noMusics') return res.status(404).send(error.message);
    next(error);
  }
};

const getTopMusics = async (req, res, next) => {
  const { limit } = req.params;

  if (!limit || limit < 1)
    return res.status(400).send('Insira um limite válido');

  try {
    const musics = await musicService.getTopMusics({ limit });

    return res.send(musics);
  } catch (error) {
    next(error);
  }
};

const voteMusic = async (req, res, next) => {
  const { path } = req;
  const { musicId } = req.params;
  const mode = path.split('/')[2];

  if (!musicId || musicId < 1)
    return res.status(400).send('Insira um id válido');

  const operation = mode === 'upvote' ? 1 : -1;

  try {
    await musicService.voteMusic({ operation, musicId });

    return res.sendStatus(200);
  } catch (error) {
    if (error.name === 'musicNotFound')
      return res.status(404).send(error.message);

    next(error);
  }
};

export { createMusic, getRecommendation, getTopMusics, voteMusic };
