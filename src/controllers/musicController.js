import * as musicService from '../services/musicService.js';

const createMusic = async (req, res) => {
  const { name, link, genres } = req.body;

  if (!name || !link)
    return res
      .status(400)
      .send(
        'Você deve enviar um objeto no padrão {name: nomeDaMusica, link: urlDoYoutube, genres: [id]}'
      );

  const success = await musicService.createMusic({ name, link, genres });

  if (success === -2)
    return res.status(400).send('Insira um link válido do youtube');

  if (success === -1)
    return res.status(409).send('Essa música já está sendo recomendada');

  if (!success) return res.status(404).send('Algum gênero não foi encontrado');

  return res.status(200).send('Música registrada com sucesso');
};

export { createMusic };
