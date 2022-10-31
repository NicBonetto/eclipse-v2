const search = rewire('../lib/routes/spotify/search');

describe( 'lib/routes/spotify/search', () => {

  it( 'should return an artist object', async() => {
    const artists = [{ name: 'Bon Iver', id: 'xxxxxxxxxx', images: [{ url: '' }] }];
    const spotifyStub = {
      searchArtists: sinon.stub().resolves({
        body: { artists: { items: [{ name: 'Bon Iver', id: 'xxxxxxxxxx', images: [{ url: '' }] }] } }
      })
    };

    const revert = search.__set__( 'spotify', spotifyStub );

    const res = await search(
      { params: { artist: 'Bon Iver' } },
      { json: ( data ) => data }
    );

    assert.deepEqual( res, artists[ 0 ] );
    sinon.assert.calledWith( spotifyStub.searchArtists, 'Bon Iver' );

    revert();
  });

});
