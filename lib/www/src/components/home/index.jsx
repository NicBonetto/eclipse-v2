import NavBar from '../shared/navbar';

export default function() {
  return (
    <div className="background">
      <div className="container">
        <NavBar/>
        <section>
          <div className="header">
            <h4>Discover Artists through an infinite chain of suggestions</h4>
          </div>
        </section>
        <section>
          <div className="header">
            <h5>Enter an artist's name:</h5>
          </div>
        </section>
      </div>
    </div>
  );
}
