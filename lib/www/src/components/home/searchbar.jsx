import { useState, useCallback } from 'react';
import axios from '../../util/axiosInstance';
import Suggestions from './suggestions';

const debounce = ( func ) => {
  let timer;
  return function( ...args ) {
    const context = this;
    if ( timer ) {
      clearTimeout( timer );
    }
    timer = setTimeout(() => {
      timer = null;
      func.apply( context, args );
    }, 500 );
  };
};

export default function() {
  const [ suggestions, setSuggestions ] = useState([]);

  const handleChange = async( value ) => {
    if ( !value ) {
      setSuggestions( [] );
    }
    const { data } = await axios.get(`/spotify/autocomplete/${ value }`);
    setSuggestions( data );
  };

  const optimized = useCallback( debounce( handleChange ), [] );

  return (
    <section>
      <input
        type="text"
        className="search"
        autoFocus="autofocus"
        onChange={ ( e ) => optimized( e.target.value ) }
      />
      <Suggestions suggestions={ suggestions }/>
    </section>
  );
}
