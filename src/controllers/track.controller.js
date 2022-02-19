const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { trackService } = require('../services');
const { Response } = require('../models');
const { spotifyService } = require('../services');

const createTrack = catchAsync(async (req, res) => {
  let response;
  const { data: tracks } = await spotifyService.searchByISRC(req.body.isrc);

  if( tracks.length ) {
    const {
      preview_url,
      name: trackTitle,
      artists : {
        0: {
          name: artistName
        }
      }
    } = tracks[0];

    const t = await trackService.createTrack({
      '_id': req.body.isrc,
      'track': tracks[0]
    });

    if( t.success ) {
      response = new Response({
        message: 'Track Created Successfully',
        data: {
          'isrc': req.body.isrc,
          preview_url,
          trackTitle,
          artistName
        }
      });
    } else {
      response = t;
    }
  } else {
    response = new Response({
      message: 'No Results found'
    });
  }

  res.status(httpStatus.OK).send(response);
});

const getTrackByISRC = catchAsync(async (req, res) => {
  let response;
  const { data: tracks } = await spotifyService.searchByISRC(req.params.isrc);

  if( tracks.length ) {
    const {
      preview_url,
      name: trackTitle,
      artists : {
        0: {
          name: artistName
        }
      }
    } = tracks[0];

    response = new Response({
      data: {
        'isrc': req.body.isrc,
        preview_url,
        trackTitle,
        artistName
      }
    });
  } else {
    response = new Response({
      message: 'No Results found'
    });
  }

  res.status(httpStatus.OK).send(response);
});


module.exports = {
  createTrack,
  getTrackByISRC
};
