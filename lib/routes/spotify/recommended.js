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
    return res.json( e );
  }
}
