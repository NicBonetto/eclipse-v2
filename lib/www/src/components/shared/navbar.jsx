import { Link } from 'react-router-dom';

export default function() {
  return (
    <section className="navbar">
      <div>
        <Link to="/">
          <img className="nav-img" src="/images/kraken.png"/>
          <span>Kraken Audio</span>
        </Link>
      </div>
    </section>
  );
}
