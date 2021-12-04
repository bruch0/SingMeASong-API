class InvalidGenre extends Error {
  constructor() {
    super('Gênero inválido, insira um gênero entre 3 e 20 caractéres');
    this.name = 'invalidGenre';
  }
}

class ConflictGenre extends Error {
  constructor() {
    super('Esse gênero já existe');
    this.name = 'conflictGenre';
  }
}

class NoGenres extends Error {
  constructor() {
    super('Não existem gêneros, que tal criar um?');
    this.name = 'noGenres';
  }
}

class GenreNotFound extends Error {
  constructor() {
    super('Algum gênero não foi encontrado');
    this.name = 'genreNotFound';
  }
}

export { InvalidGenre, ConflictGenre, NoGenres, GenreNotFound };
