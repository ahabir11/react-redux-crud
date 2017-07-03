import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => (
  <div className="movie" style={{ float: 'left' }}>
    <div className="movie__image">
      <Link to={`/movies/${movie.id}`}>
        <img alt={movie.name} src={movie.image} />
      </Link>
    </div>

    <div className="movie__info">
      <p><b>{movie.name}</b></p>
      <p>{movie.director}</p>
      <p>{movie.released}</p>
    </div>
  </div>
);

MovieItem.propTypes = {
  movie: PropTypes.shape({
    director: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    released: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default MovieItem;