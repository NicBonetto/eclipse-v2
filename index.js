require('dotenv').config();

const express = require('express');
const routes  = require('./lib/routes/index');

const app = express();

app.use( express.static( __dirname + '/lib/www/public/' ) );
app.use( express.json() );

app.post( '/spotify/authorize', routes.authorize );
app.get( '/spotify/autocomplete/:artist', routes.autocomplete );
app.get( '/spotify/:id/recommended', routes.recommended );
app.get( '/spotify/artist/:artist', routes.search );
app.get( '/spotify/:artist/songs', routes.songs );

app.listen( process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${ process.env.PORT || 3000 }`);
});
