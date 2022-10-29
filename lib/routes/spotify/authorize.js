const spotify = require('../../utils/spotify');

module.exports = async function( req, res ) {
  try {
    const { body } = await spotify.clientCredentialsGrant();
    spotify.setAccessToken( body.access_token );
    return res.sendStatus( 200 );
  } catch ( e ) {
    return res.json( e );
  }
}
