import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/loader';
import axios from '../../util/axiosInstance';

export default function({ suggestions }) {
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState( false );

  const handleClick = async( value ) => {
    setLoading( true );
    try {
      const artist = await axios.get(`/spotify/artist/${ value }`);
      navigate('/discover', { state: artist } );
    } catch ( e ) {
      console.log( e );
    } finally {
      setLoading( false );
    }
  };

  if ( loading ) {
    return (
      <div>
        <Loader/>
      </div>
    );
  } else {
    return (
      <ul className="list">
        {
          [ ...new Set( suggestions ) ].map( ( suggestion, i ) => {
            return <li
              key={ i }
              className="list-item"
              onClick={ ( e ) => handleClick( e.target.value ) }
            >
              { suggestion }
            </li>;
          })
        }
      </ul>
    );
  }
}
