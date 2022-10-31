const songs = rewire('../lib/routes/spotify/songs');

describe( 'lib/routes/spotify/songs', () => {

  it( 'should return a list of tracks', async() => {
    const tracks = [
      { name: 'Only Love', preview_url: 'http://only_love.mp3' },
      { name: 'Esmeralda', preview_url: 'http://esma.mp3' },
      { name: 'I Forget Where We Were', preview_url: 'http://ifwww.mp3' }
    ];

    const spotifyStub = {
      searchTracks: sinon.stub().resolves({ body: { tracks: { items: tracks } } })
    };

    const revert = songs.__set__( 'spotify', spotifyStub );

    const res = await songs(
      { params: { artist: 'Ben Howard' } },
      { json: ( data ) => data }
    );

    const expected = [
      { name: 'Only Love', url: 'http://only_love.mp3' },
      { name: 'Esmeralda', url: 'http://esma.mp3' },
      { name: 'I Forget Where We Were', url: 'http://ifwww.mp3' }
    ];

    assert.deepEqual( res, expected );
    sinon.assert.calledWith( spotifyStub.searchTracks, 'artist:Ben Howard' );

    revert();
  });

});
