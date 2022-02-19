const config = require('../config/config');
const { Response } = require('../models');
const axios = require('axios');
const qs = require('qs');
const auth_token = Buffer.from(`${config.spotify.clientCredentials}:${config.spotify.clientSecret}`, 'utf-8').toString('base64');


const getAuth = async () => {
  try{
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = `${config.spotify.tokenUrl}`;
    const data = qs.stringify({'grant_type':'client_credentials'});

    const response = await axios.post(token_url, data, {
      headers: {
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  }catch(error){
    //on fail, log the error in console
    console.log(error);
  }
}

/**
 * Search by isrc
 * @param {Object} body
 * @returns {Promise<any>}
 */
const searchByISRC = async (isrc) => {
  let r;
  const access_token = await getAuth();
  const api_url = `https://api.spotify.com/v1/search?type=track&q=isrc:${isrc}`;

  try{
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    if( response.data.tracks.items.length === 0 ) {
      return [];
    }

    // sort tracks by popularity
    // having trouble finding the spotify docs that list if 1 = most popular or if the greater the number means more popular
    // so this sort could be backwards
    const sortedTracks = response.data.tracks.items.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1);

    r = new Response({
      data: [sortedTracks[0]]
    });
  }catch(error){
    r = new Response({
      success: false,
      message: error.message()
    });
  }

  return r;
};

/**
 * Search by artist name
 * @param {Object} body
 * @returns {Promise<any>}
 */
const searchByArtistName = async (name) => {
  let r;
  const access_token = await getAuth();
  const api_url = `https://api.spotify.com/v1/search?type=artist&q=${name}&limit=10`;

  try{
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    if( response.data.artists.items.length === 0 ) {
      return [];
    }

    // sort tracks by popularity
    // having trouble finding the spotify docs that list if 1 = most popular or if the greater the number means more popular
    // so this sort could be backwards
    const sorted = response.data.artists.items.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1);

    r = new Response({
      data: sorted
    });
  }catch(error){
    r = new Response({
      success: false,
      message: error.message()
    });
  }

  return r;
};

module.exports = {
  searchByISRC,
  searchByArtistName
};
