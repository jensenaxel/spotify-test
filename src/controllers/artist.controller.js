const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Response } = require('../models');
const { spotifyService } = require('../services');

const getArtistByName = catchAsync(async (req, res) => {
  let response;
  const { data } = await spotifyService.searchByArtistName(req.query.name);

  if( data.length ) {
    response = new Response({
      data: data
    });
  } else {
    response = new Response({
      message: 'No Results found'
    });
  }

  res.status(httpStatus.OK).send(response);
});

module.exports = {
  getArtistByName,
};
