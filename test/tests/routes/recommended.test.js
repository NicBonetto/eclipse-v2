const recommended = rewire('../lib/routes/spotify/recommended');

describe( 'lib/routes/spotify/recommended', async() => {

  it( 'should return a list of formatted artists', async() => {
    const artists = [
      { name: 'Joe Kingston', images: [{ url: 'http://sillyimage.png' }] },
      { name: 'Donald Duck', images: [{ url: 'http://donald.png' }] },
      { name: 'Night Riot', images: [{ url: 'http://riot.png' }] }
    ];

    const spotifyStub = {
      getArtistRelatedArtists: sinon.stub().resolves({
        body: { artists: artists }
      })
    };

    const revert = recommended.__set__( 'spotify', spotifyStub );

    const res = await recommended(
      { params: { id: 'xxxxxxxxxx' } },
      { json: ( data ) => data }
    );

    const expected = [
      { name: 'Joe Kingston', img: 'http://sillyimage.png' },
      { name: 'Donald Duck', img: 'http://donald.png' },
      { name: 'Night Riot', img: 'http://riot.png' }
    ];

    assert.deepEqual( res, expected );
    sinon.assert.calledWith( spotifyStub.getArtistRelatedArtists, 'xxxxxxxxxx' );

    revert();
  });

  it( 'should forward the error', async() => {
    const spotifyStub = {
      getArtistRelatedArtists: sinon.stub().rejects('boom')
    };

    const revert = recommended.__set__( 'spotify', spotifyStub );

    const res = await recommended(
      { params: { id: 'xxxxxxxxxx' } },
      { json: ( data ) => data }
    );

    assert.equal( res, 'boom' );
    sinon.assert.calledWith( spotifyStub.getArtistRelatedArtists, 'xxxxxxxxxx' );

    revert();
  })

});