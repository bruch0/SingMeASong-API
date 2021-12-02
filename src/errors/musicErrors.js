class InvalidBody extends Error {
  constructor() {
    super(
      'O nome da música deve ter entre 3 e 20 caractéres, o link do youtube deve ser válido e deve ser escolhido no mínimo um id de gênero acima de 0'
    );
    this.name = 'invalidBody';
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

class NoMusics extends Error {
  constructor() {
    super('Não há nenhuma música ainda, por que você não recomenda alguma?');
    this.name = 'noMusics';
  }
}

export { InvalidBody, ConflictMusic, GenreNotFound, NoMusics };
