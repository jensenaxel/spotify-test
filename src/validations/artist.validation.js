const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getArtistByName = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};

module.exports = {
  getArtistByName,
};
