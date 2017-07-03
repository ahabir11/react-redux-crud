import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Link } from 'react-router-dom'
import Movies from './components/Movies';
import MoviePage from './components/MoviePage';
import NewMoviePage from './components/NewMoviePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h2>My Movie Collection</h2>
            <Link to="/">Home</Link>
          </div>
          <div className="movies-container">
            <Route exact path="/" component={Movies} />
            <Route path="/collection" component={Movies} />
            <Route path="/movies/new" component={NewMoviePage} />
            <Route path="/movies/:id" component={MoviePage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;