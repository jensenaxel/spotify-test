const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTrack  = {
  body: Joi.object().keys({
    isrc: Joi.string().required(),
  }),
};

const getTrackByISRC = {
  params: Joi.object().keys({
    isrc: Joi.string(),
  }),
};

module.exports = {
  createTrack,
  getTrackByISRC
};
