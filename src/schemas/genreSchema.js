import joi from 'joi';

const createGenre = joi.object({
  name: joi.string().required().min(3).max(20),
});

export { createGenre };
