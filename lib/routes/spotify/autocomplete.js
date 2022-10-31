const spotify = require('../../utils/spotify');

module.exports = async function( req, res ) {
  try {
    const artist = req.params.artist.split(/[+]/g).join(' ');
    const { body } = await spotify.searchArtists( artist );
    const suggestions = body.artists.items
      .map( artist => artist.name )
      .slice( 0, 10 );
    return res.json( suggestions );
  } catch ( e ) {
    const { error } = e.body;
    return res.status( error.status ).send( error.message );
  }
}
