const spotify = require('../../utils/spotify');

module.exports = async function( req, res ) {
  try {
    const artist = req.params.artist.split(/[+]/g).join(' ');
    const { body } = await spotify.searchTracks(`artist:${ artist }`);
    const tracks = body.tracks.items.map( track => {
      return { name: track.name, url: track.preview_url };
    });
    return res.json( tracks );
  } catch ( e ) {
    return res.json( e );
  }
}
