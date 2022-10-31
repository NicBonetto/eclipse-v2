const spotify = require('../../utils/spotify');

module.exports = async function( req, res ) {
  try {
    const artist = req.params.artist.split(/[+]/g).join(' ');
    const { body } = await spotify.searchArtists( artist );
    return res.json( body.artists.items[ 0 ] );
  } catch ( e ) {
    const { error } = e.body;
    return res.status( error.status ).send( error.message );
  }
}
