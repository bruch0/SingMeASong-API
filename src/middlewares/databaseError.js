const databaseError = (error, req, res, next) => {
  res.status(500).send('Alguma coisa deu errada no banco');
};

export default databaseError;
