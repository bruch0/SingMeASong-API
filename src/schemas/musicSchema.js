import joi from 'joi';

const createMusic = joi.object({
  name: joi.string().required().min(3).max(20),
  link: joi
    .string()
    .required()
    .pattern(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
    ),
  genres: joi.array().items(joi.number().required().min(1)).required(),
});

export { createMusic };
