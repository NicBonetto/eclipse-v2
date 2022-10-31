import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10e3
});

instance.interceptors.response.use(
  null,
  async function( err ) {
  if ( err.response.status === 401 ) {
    await instance.post('/spotify/authorize');
    return instance( err.config );
  } else {
    return Promise.reject( err );
  }
});

export default instance;
