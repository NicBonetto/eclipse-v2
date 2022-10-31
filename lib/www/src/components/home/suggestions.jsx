import axios from 'axios';

export default function({ suggestions }) {
  return (
    <ul className="list">
      {
        suggestions.map( ( suggestion, i ) => {
          return <li key={ i } className="list-item">{ suggestion }</li>;
        })
      }
    </ul>
  );
}
