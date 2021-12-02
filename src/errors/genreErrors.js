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

export { InvalidGenre, ConflictGenre };
