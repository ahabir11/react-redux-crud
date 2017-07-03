import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movieActions from '../actions/movie_actions';
import MovieForm from './MovieForm';
import moviesApi from '../api/movies_api';

class NewMoviePage extends React.Component {
  state = {
    movie: {
      newId: 0,
      name: '',
      director: '',
      released: '',
      description: ''
    },
    saving: false
  }

  componentWillMount() {
    let movie = this.state.movie;
    const id = moviesApi.generateId();
    movie.newId = id;
    this.setState({ movie });
  }

  updateMovieState = (event) => {
    const field = event.target.name;
    let movie = this.state.movie;
    movie[field] = event.target.value;
    return this.setState({ movie });
  }

  createMovie = event => {
    event.preventDefault();
    this.props.actions.createMovie(this.state.movie);
    this.props.history.push(`/movies/${this.state.movie.newId}`)
  }

  render() {
    return (
      <div>
        <h1>New Movie</h1>
        <MovieForm
          movie={this.state.movie}
          onSave={this.createMovie}
          onChange={this.updateMovieState} />
      </div>
    )
  }
}

NewMoviePage.propTypes = {
  movie: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

// Pull in the React Router context so router is available on this.context.router
NewMoviePage.contextTypes = {
  router: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  let movie = { newId: 0, name: '', director: '', released: '', description: '' };
  const movieId = movie.params ? ownProps.params.id : undefined;
  if (movieId && state.movies.length > 0) {
    movie = Object.assign({}, state.movies.find(movies => movies.id === parseInt(movieId, 10)))
  }

  return { movie }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(movieActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMoviePage);