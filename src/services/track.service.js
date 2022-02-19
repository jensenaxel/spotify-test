const { Track, Response } = require('../models');

/**
 * Create a track
 * @param {Object} trackBody
 * @returns {Promise<Track>}
 */
const createTrack = async (trackBody) => {
  let r
  try{
    r = new Response({
      data: await Track.create(trackBody)
    });
  } catch(error) {
    if( error.message.indexOf('duplicate') >= 0 ) {
      r = new Response({
        success: true,
        message: "Item already in db",
        data: trackBody
      });
    } else {
      r = new Response({
        success: false,
        message: error.message
      });
    }
  }
  return r;
};
module.exports = {
  createTrack,
};
