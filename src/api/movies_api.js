const moviesArr = [
  {
    "id": 1,
    "name": "The Hateful Eight",
    "director": "Quentin Tarantino",
    "released": "December 25, 2015",
    "image": "https://image.tmdb.org/t/p/original/fqe8JxDNO8B8QfOGTdjh6sPCdSC.jpg",
    "description": "Set six or eight or twelve years after the Civil War, a stagecoach hurtles through the wintry Wyoming landscape. The passengers, bounty hunter John Ruth and his fugitive Daisy Domergue, race towards the town of Red Rock where Ruth, known in these parts as The Hangman, will bring Domergue to justice. Along the road, they encounter two strangers: Major Marquis Warren, a black former union soldier turned infamous bounty hunter, and Chris Mannix, a southern renegade who claims to be the town's new Sheriff. Losing their lead on the blizzard, Ruth, Domergue, Warren and Mannix seek refuge at Minnie's Haberdashery, a stagecoach stopover on a mountain pass. When they arrive at Minnie's, they are greeted not by the proprietor but by four unfamiliar faces. Bob, who's taking care of Minnie's while she's visiting her mother, is holed up with Oswaldo Mobray, the hangman of Red Rock, cow-puncher Joe Gage (Madsen), and Confederate General Sanford Smithers. As the storm overtakes the mountainside stopover, our eight travelers come to learn they may not make it to Red Rock after all..."
  },
  {
    "id": 2,
    "name": "Reservoir Dogs",
    "director": "Quentin Tarantino",
    "released": "October 23, 1992",
    "image": "https://image.tmdb.org/t/p/original/tB2ITHg556e7aTV6cqQqVAXkdxN.jpg",
    "description": "In 1992, Reservoir Dogs transformed Quentin Tarantino practically overnight from an obscure, unproduced screenwriter and part-time actor to the most influential new filmmaker of the 1990s. The story looks at what happens before and after (but not during) a botched jewelry store robbery organized by Joe Cabot (Lawrence Tierney). Mr. White (Harvey Keitel) is a career criminal who takes a liking to newcomer Mr. Orange (Tim Roth) and enjoys showing him the ropes. Mr. Pink (Steve Buscemi) is a weaselly loner obsessed with professionalism. Mr. Blonde (Michael Madsen) has just gotten out of jail after taking the rap on a job for Cabot; he's grateful for the work but isn't the same person he used to be. While Mr. Blonde goes nuts during the heist, the thieves are surprised by the sudden arrival of the police, and Mr. Pink is convinced one of their team is a cop. So who's the rat? What do they do about Mr. Blonde? And what do they do with Mr. Orange, who took a bullet in the gut and is slowly bleeding to death? Reservoir Dogs jumps back and forth between pre- and post-robbery events, occasionally putting the narrative on pause to let the characters discuss such topics as the relative importance of tipping, who starred in Get Christie Love!, and what to do when you enter a men's room full of cops carrying a briefcase full of marijuana. ~ Mark Deming, Rovi"
  },
  {
    "id": 3,
    "name": "God Bless America",
    "director": "Bobcat Goldthwait",
    "released": "May 11, 2012",
    "image": "https://image.tmdb.org/t/p/original/nVJPpafbPOxTLVZXzTkb3LRRo2N.jpg",
    "description": "Frank (Joel Murray) has had enough of the downward spiral of American culture. Divorced, recently fired, and possibly terminally ill, Frank truly has nothing left to live for. But instead of taking his own life, he buys a gun and decides to take out his frustration on the cruelest, stupidest, most intolerant people he can imagine -- starting with some particularly odious reality television stars. Frank finds an unusual accomplice in a high-school student named Roxy (Tara Lynne Barr), who shares his sense of rage and disenfranchisement. Together they embark on a nationwide assault on our country's most irritating celebrities."
  },
  {
    "id": 4,
    "name": "Annie Hall",
    "director": "Woody Allen",
    "released": "April 20, 1977",
    "image": "https://image.tmdb.org/t/p/original/iE1MVapfo2JC9RzrdjiMsEzw1Co.jpg",
    "description": "Annie Hall is a comical look at the up and down relationship between a New York City TV writer and his aspiring actress/singer girlfriend who's originally from the Midwest."
  }
];

const placeholderImg = 'https://upload.wikimedia.org/wikipedia/en/f/f9/No-image-available.jpg'

/**
 * Remove false in signature to reset localStorage from the existing movies object
 */
resetLocalStorageMovies(false);

// Save the movies array to localStorage as it's going to be our DB
if (!window.localStorage.movies) {
  window.localStorage.setItem('movies', JSON.stringify(moviesArr));
}

/**
 * Get the movies DB object from the localStorage
 */
const getMoviesParsed = () => JSON.parse(window.localStorage.getItem('movies'));

class MoviesApi {
  static getAllMovies() {
    return new Promise((resolve, reject) => {
      const movies = getMoviesParsed();
      resolve(Object.assign([], movies));
    });
  }

  static generateId = (movie) => {
    const movies = getMoviesParsed();
    const lastId = movies.length ? movies[movies.length - 1].id : 0;
    return lastId + 1;
  };

  static saveMovies(movie) {
    movie = Object.assign({}, movie); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      
      //Set image
      movie.image = movie.image || placeholderImg;

      // Update existing movie
      if (movie.id) {
        let moviesArrCopy = JSON.parse(window.localStorage.movies);
        const existingMovieIndex = moviesArr.findIndex(a => parseInt(a.id, 10) === movie.id);
        moviesArrCopy.splice(existingMovieIndex, 1, movie);
        window.localStorage.removeItem('movies');
        window.localStorage.setItem('movies', JSON.stringify(moviesArrCopy));

        // Create new movie
      } else {
        const moviesArrCopy = JSON.parse(window.localStorage.movies);
        movie.id = movie.newId;
        const newMoviesArr = moviesArrCopy.concat(movie);
        window.localStorage.removeItem('movies');
        window.localStorage.setItem('movies', JSON.stringify(newMoviesArr));
      }

      resolve(movie);
    });
  }

  static deleteMovie(movie) {
    return new Promise((resolve, reject) => {
      const moviesArrCopy = JSON.parse(window.localStorage.movies);
      const indexOfMovieToDelete = moviesArrCopy.findIndex(movieCopy =>
        parseInt(movieCopy.id, 10) === movie.id
      );
      const newMoviesArr = moviesArrCopy.slice(indexOfMovieToDelete, 1);
      window.localStorage.removeItem('movies');
      window.localStorage.setItem('movies', JSON.stringify(newMoviesArr));
      resolve();
    });
  }
}

function resetLocalStorageMovies(go = 'go') {
  if (go !== false) {
    window.localStorage.removeItem('movies')
  }
};

export default MoviesApi;
