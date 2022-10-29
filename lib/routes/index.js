const authorize    = require('./spotify/authorize');
const autocomplete = require('./spotify/autocomplete');
const recommended  = require('./spotify/recommended');
const search       = require('./spotify/search');
const songs        = require('./spotify/songs');

module.exports = {
  authorize,
  autocomplete,
  recommended,
  search,
  songs
};
