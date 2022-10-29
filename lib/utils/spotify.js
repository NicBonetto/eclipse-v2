const Spotify = require('spotify-web-api-node');

module.exports = new Spotify({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: process.env.SPOTIFY_CALLBACK
});
