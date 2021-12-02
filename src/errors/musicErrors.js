class InvalidMusic extends Error {
  constructor() {
    super(
      'O link do youtube deve ser válido e deve ser escolhido no mínimo um id de gênero acima de 0'
    );
    this.name = 'invalidUrl';
  }
}

class ConflictMusic extends Error {
  constructor() {
    super('Essa música já está sendo recomendada');
    this.name = 'conflictMusic';
  }
}

class GenreNotFound extends Error {
  constructor() {
    super('Algum gênero não foi encontrado');
    this.name = 'genreNotFound';
  }
}

export { InvalidMusic, ConflictMusic, GenreNotFound };
