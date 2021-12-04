import faker from 'faker';

import * as genreService from '../../src/services/genreService.js';
import * as genreRepository from '../../src/repositories/genreRepository.js';
import { NoGenres } from '../../src/errors/genreErrors.js';

describe('genre Service create genre', () => {
  jest.spyOn(genreRepository, 'createGenre').mockImplementation(() => true);

  it('should throw an error for name with a length smaller than 3', async () => {
    const name = faker.datatype.string(2);
    try {
      await genreService.createGenre({ name });
    } catch (error) {
      expect(error.name).toEqual('invalidGenre');
    }
  });

  it('should return 1 for name with a length equal to 3', async () => {
    jest
      .spyOn(genreRepository, 'genreExists')
      .mockImplementationOnce(() => false);

    const name = faker.datatype.string(3);
    const result = await genreService.createGenre({ name });

    expect(result).toEqual(1);
  });

  it('should return 1 for name with a length greater than 3', async () => {
    jest
      .spyOn(genreRepository, 'genreExists')
      .mockImplementationOnce(() => false);

    const name = faker.datatype.string(4);
    const result = await genreService.createGenre({ name });

    expect(result).toEqual(1);
  });

  it('should return -1 for name with a length greater than 20', async () => {
    const name = faker.datatype.string(21);
    try {
      await genreService.createGenre({ name });
    } catch (error) {
      expect(error.name).toEqual('invalidGenre');
    }
  });

  it('should return 1 for name with a length equal to 20', async () => {
    jest
      .spyOn(genreRepository, 'genreExists')
      .mockImplementationOnce(() => false);

    const name = faker.datatype.string(20);
    const result = await genreService.createGenre({ name });

    expect(result).toEqual(1);
  });

  it('should return 1 for name with a length smaller than 20', async () => {
    jest
      .spyOn(genreRepository, 'genreExists')
      .mockImplementationOnce(() => false);

    const name = faker.datatype.string(19);
    const result = await genreService.createGenre({ name });

    expect(result).toEqual(1);
  });

  it('should return 0 for a registered genre', async () => {
    jest
      .spyOn(genreRepository, 'genreExists')
      .mockImplementationOnce(() => true);

    const name = faker.datatype.string(19);

    try {
      await genreService.createGenre({ name });
    } catch (error) {
      expect(error.name).toEqual('conflictGenre');
    }
  });
});

describe('genre Service get genres', () => {
  it('should throw an error when no genres are found', async () => {
    jest.spyOn(genreRepository, 'getGenres').mockImplementationOnce(() => []);

    const promise = genreService.getGenres();

    await expect(promise).rejects.toThrow(NoGenres);
  });

  it('should return an array of genres if at least one genre is registered', async () => {
    7;
    const name = faker.music.genre();

    jest.spyOn(genreRepository, 'getGenres').mockImplementationOnce(() => [
      {
        id: 1,
        name,
      },
    ]);

    const genres = await genreService.getGenres();

    expect(genres).toEqual([{ id: 1, name }]);
  });
});
