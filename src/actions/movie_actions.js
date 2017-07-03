import * as types from './action_types';
import moviesApi from '../api/movies_api';

export const loadMoviesSuccess = movies => {
  return { type: types.LOAD_MOVIES_SUCCESS, movies };
}

export const createMovieSuccess = movie => {
  return {type: types.CREATE_MOVIE_SUCCESS, movie}
}

export const updateMovieSuccess = movie => {
  return {type: types.UPDATE_MOVIE_SUCCESS, movie}
}

export const deleteMovieSuccess = movie => {
  return {type: types.DELETE_MOVIE_SUCCESS, movie}
}

export const loadMovies = () => {
  return dispatch => {
    return moviesApi.getAllMovies().then(movies => {
      dispatch(loadMoviesSuccess(movies));
    }).catch(error => {
      throw(error);
    });
  };
};

export const createMovie = (movie) => {
  return dispatch => {
    return moviesApi.saveMovies(movie).then(responseMovie => {
      dispatch(createMovieSuccess(responseMovie));
    }).catch(error => {
      throw(error);
    })
  }
}

export const updateMovie = (movie) => {
  return dispatch => {
    return moviesApi.saveMovies(movie).then(responseMovie => {
      dispatch(updateMovieSuccess(responseMovie));
    }).catch(error => {
      throw(error);
    })
  }
}

export const deleteMovie = (movie) => {
  return dispatch => {
    return moviesApi.deleteMovie(movie).then(() => {
      dispatch(deleteMovieSuccess(movie));
    }).catch(error => {
      throw(error);
    })
  }
}