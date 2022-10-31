const autocomplete = rewire('../lib/routes/spotify/autocomplete');

describe( 'lib/routes/spotify/autocomplete', () => {

  it( 'should return a list of artists', async() => {
    const spotifyStub = {
      searchArtists: sinon.stub().resolves({
        body: { artists: { items: [
          { name: 'Bob Legend' }, { name: 'Bobby King' }
        ] } }
      })
    };

    const revert = autocomplete.__set__( 'spotify', spotifyStub );

    const res = await autocomplete(
      { params: { artist: 'Bob' } },
      { json: ( data ) => data }
    );

    assert.deepEqual( res, [ 'Bob Legend', 'Bobby King' ] );
    sinon.assert.calledWith( spotifyStub.searchArtists, 'Bob' );

    revert();
  });

  it( 'should return a max of 10 artists', async() => {
    const artists = [
      { name: 'Bob Legend' },
      { name: 'Bobby King' },
      { name: 'Bobo Baggins' },
      { name: 'Bobi Bird' },
      { name: 'Bob Dylan' },
      { name: 'Boboo' },
      { name: 'Hey Bob' },
      { name: 'Just Bobin' },
      { name: 'King Bobby' },
      { name: 'Bobo' },
      { name: 'Bob and the Legends' }
    ];

    const spotifyStub = {
        searchArtists: sinon.stub().resolves({
          body: { artists: { items: artists } }
        })
      };
  
      const revert = autocomplete.__set__( 'spotify', spotifyStub );
  
      const res = await autocomplete(
        { params: { artist: 'Bob' } },
        { json: ( data ) => data }
      );
  
      assert.equal( res.length, 10 );
      assert.deepEqual( res, artists.map( artist => artist.name ).slice( 0, 10 ) );
      sinon.assert.calledWith( spotifyStub.searchArtists, 'Bob' );
  
      revert();
  });

});
