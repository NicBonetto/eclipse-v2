const spotify = require('../../utils/spotify');

module.exports = async function( req, res ) {
  try {
    const artist = req.params.artist.split(/[+]/g).join(' ');
    const { body } = await spotify.searchArtists( artist );
    const suggestions = body.artists.items.map( artist => artist.name );
    return res.json( suggestions.slice( 0, 10 ) );
  } catch ( e ) {
    return res.json( e );
  }
}
