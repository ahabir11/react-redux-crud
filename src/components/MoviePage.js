import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movieActions from '../actions/movie_actions';
import MovieForm from './MovieForm';

class MoviePage extends React.Component {
  state = {
    isEditing: false,
    movie: this.props.movie
  }

  // In case the state been changed after render
  componentWillReceiveProps = nextProps => {
    if (this.props.movie.id !== nextProps.movie.id) {
      this.setState({movie: nextProps.movie})
    }
  }

  toggleEdit = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }))
  }

  deleteMovie = () => {
    this.props.actions.deleteMovie(this.state.movie);
    this.props.history.push('/')
  }

  updateMovieState = (event) => {
    const field = event.target.name;
    let movie = this.state.movie;
    movie[field] = event.target.value;
    return this.setState({movie});
  }

  updateMovie = event => {
    event.preventDefault();
    this.props.actions.updateMovie(this.state.movie);
    this.toggleEdit();
  }

  render() {
    const { movie } = this.state;
    if (this.state.isEditing) {
      return (
        <div>
          <MovieForm 
            movie={movie}
            onSave={this.updateMovie}
            onChange={this.updateMovieState} />
        </div>
      )
    }
    return (
      <div>
        <div className="movie-title">
          <h2>{this.props.movie.name}</h2>

          <hr />
        </div>

        <div className="movie-container">
          <div className="movie-image">
            <img src={this.props.movie.image} alt='' style={{ width: '75%', height: 'auto' }} />
          </div>

          <div className="movie-information" style={{ height: '100%' }}>
            <p><b>Director:</b> {this.props.movie.director}</p>
            <p><b>Release Date:</b> {this.props.movie.released}</p>
            <p><b>Description:</b> {this.props.movie.description} </p>
            <button className="btn btn-default" onClick={this.toggleEdit}>Edit</button>
            <button className="btn btn-danger" onClick={this.deleteMovie}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
};

MoviePage.propTypes = {
  movie: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let movie = { name: '', image: '', director: '', released: '', description: '' };
  const movieId = ownProps.match.params.id;
  if (state.movies.length > 0) {
    movie = Object.assign({}, state.movies.find(movie => movie.id === parseInt(movieId, 10)))
  }
  return { movie }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(movieActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);