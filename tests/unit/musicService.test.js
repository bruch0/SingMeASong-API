import faker from 'faker';

import * as musicService from '../../src/services/musicService';
import * as musicGenresRepository from '../../src/repositories/musicGenresRepository.js';
import * as musicRepository from '../../src/repositories/musicRepository.js';
import * as genreRepository from '../../src/repositories/genreRepository.js';

describe('music Service random recommendation', () => {
  jest.spyOn(musicGenresRepository, 'getMusicGenres').mockImplementation(() => {
    return {
      id: faker.datatype.number(),
      name: faker.music.genre(),
    };
  });

  it('should throw an error when there is no musics in the database', async () => {
    jest.spyOn(musicRepository, 'getMusics').mockImplementationOnce(() => []);

    try {
      await musicService.getRecommendation();
    } catch (error) {
      expect(error.name).toEqual('noMusics');
    }
  });

  it('should return a object containing music name, score, genres and youtubeLink', async () => {
    jest.spyOn(musicRepository, 'getMusics').mockImplementationOnce(() => [
      {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
        link: faker.internet.url(),
        score: faker.datatype.number(),
      },
    ]);

    const result = await musicService.getRecommendation();

    expect(result).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        youtubeLink: expect.any(String),
        id: expect.any(Number),
        score: expect.any(Number),
      })
    );
  });
});

describe('music Service register recommendation', () => {
  jest.spyOn(musicGenresRepository, 'getMusicGenres').mockImplementation(() => {
    return {
      id: faker.datatype.number(),
      name: faker.music.genre(),
    };
  });

  jest.spyOn(musicRepository, 'createMusic').mockImplementation(() => true);

  it('should throw an error when the name is too short', async () => {
    const body = {
      name: faker.datatype.string(2),
      link: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
      genres: [faker.datatype.number()],
    };

    try {
      await musicService.createMusic(body);
    } catch (error) {
      expect(error.name).toEqual('invalidBody');
    }
  });

  it('should throw an error when the name is too long', async () => {
    const body = {
      name: faker.datatype.string(2),
      link: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
      genres: [faker.datatype.number()],
    };

    try {
      await musicService.createMusic(body);
    } catch (error) {
      expect(error.name).toEqual('invalidBody');
    }
  });

  it('should throw an error when the link does not match the pattern', async () => {
    const body = {
      name: faker.datatype.string(10),
      link: faker.datatype.string(),
      genres: [faker.datatype.number()],
    };

    try {
      await musicService.createMusic(body);
    } catch (error) {
      expect(error.name).toEqual('invalidBody');
    }
  });

  it('should throw an error when the genres does not match the pattern', async () => {
    const body = {
      name: faker.datatype.string(10),
      link: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
      genres: [faker.datatype.string()],
    };

    try {
      await musicService.createMusic(body);
    } catch (error) {
      expect(error.name).toEqual('invalidBody');
    }
  });

  it('should throw an error when the music is already recommended', async () => {
    jest
      .spyOn(musicRepository, 'musicExists')
      .mockImplementationOnce(() => true);

    const body = {
      name: faker.datatype.string(10),
      link: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
      genres: [faker.datatype.number()],
    };

    try {
      await musicService.createMusic(body);
    } catch (error) {
      expect(error.name).toEqual('conflictMusic');
    }
  });

  it('should throw an error when the genreId is not valid', async () => {
    jest
      .spyOn(musicRepository, 'musicExists')
      .mockImplementationOnce(() => false);

    const genres = [faker.datatype.number()];

    jest.spyOn(genreRepository, 'getGenres').mockImplementationOnce(() => []);

    const body = {
      name: faker.datatype.string(10),
      link: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
      genres,
    };

    try {
      await musicService.createMusic(body);
    } catch (error) {
      expect(error.name).toEqual('genreNotFound');
    }
  });

  it('should return 1 when everything is ok', async () => {
    jest
      .spyOn(musicRepository, 'musicExists')
      .mockImplementationOnce(() => false);

    const genres = [1];

    jest
      .spyOn(genreRepository, 'getGenres')
      .mockImplementationOnce(() => genres);

    const body = {
      name: faker.datatype.string(10),
      link: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
      genres,
    };

    const result = await musicService.createMusic(body);

    expect(result).toEqual(1);
  });
});

describe('music Service top recommendations', () => {
  jest.spyOn(musicGenresRepository, 'getMusicGenres').mockImplementation(() => {
    return {
      id: faker.datatype.number(),
      name: faker.music.genre(),
    };
  });

  it('should throw an error when there is no musics in the database', async () => {
    jest.spyOn(musicRepository, 'getTopMusics').mockImplementationOnce(() => [
      {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
        link: faker.internet.url(),
        score: faker.datatype.number(),
      },
    ]);

    jest
      .spyOn(musicGenresRepository, 'getAllMusicGenres')
      .mockImplementationOnce(() => [
        {
          id: faker.datatype.number(),
          music_id: faker.datatype.number(),
          genre_id: faker.datatype.number(),
          name: faker.music.genre(),
        },
      ]);

    const result = await musicService.getTopMusics({
      limit: faker.datatype.number(),
    });

    const object = result[0];

    expect(object).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        youtubeLink: expect.any(String),
        id: expect.any(Number),
        score: expect.any(Number),
        genres: expect.any(Object),
      })
    );
  });
});
