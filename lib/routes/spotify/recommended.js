const spotify = require('../../utils/spotify');

module.exports = async function( req, res ) {
  try {
    const { body } = await spotify.getArtistRelatedArtists( req.params.id );
    const data = body.artists.map( artist => {
      return {
        name: artist.name,
        img: artist.images[ 0 ].url
      };
    });
    return res.json( data );
  } catch ( e ) {
    const { error } = e.body;
    return res.status( error.status ).send( error.message );
  }
}
