import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App';
import Collection from './components/Collection';
import MoviePage from './components/MoviePage';
import './index.css';


 const Routes = () => (
  <Route path="/" component={App}>
    <div className="container">
      <Route exact path="/" component={Collection} />
      <Route path="collection" component={Collection} />
      <Route path="movies/:id" component={MoviePage} />
    </div>
  </Route>
);

export default Routes;