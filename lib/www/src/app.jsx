import '../public/styles/index.scss';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const pages  = import.meta.glob( './pages/*.jsx', { eager: true } );
const routes = Object.keys( pages ).map( path => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[ 1 ];
  return {
    name,
    path: name === 'home' ? '/' : `${ name.toLowerCase() }`,
    component: pages[ path ].default
  };
});

const root = ReactDOM.createRoot( document.getElementById('root') );

root.render(
  <BrowserRouter>
    <Routes>
      {
        routes.map( ({ path, component: RouteComp }) =>
          <Route
            key={ path }
            path={ path }
            element={ <RouteComp/> }
          >
          </Route>
        )
      }
    </Routes>
  </BrowserRouter>
);
