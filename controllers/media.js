const axios = require("axios");

// @descE : Get all new movies
//@route : GET /media
exports.getNewMedia = async (req, res, next) => {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`;
    const data = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    const { results } = data.data;
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server Error",
    });
  }
};

// @desc : Get a movie by it's name using imdb api
//@route : GET /media/find/:name
exports.getByTitle = async (req, res, next) => {
  try {
    const { name } = req.params;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${name}&page=1`;
    const data = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    const { results } = data.data;
    res.status(200).json({
      success: true,
      count: results.length,
      data: data.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server Error",
    });
  }
};

//@desc   Get data by click on media
//@route: GET /media/:id
exports.getMetaData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    const getCreditUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

    const movieMetaData = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    const movieCredit = await axios.get(getCreditUrl, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    const { cast } = movieCredit.data;
    const {
      genres,
      original_language,
      original_title,
      overview,
      poster_path,
      release_date,
      runtime,
      vote_count,
      vote_average,
    } = movieMetaData.data;

    const movieData = {
      title: original_title,
      genres: genres,
      original_language: original_language,
      overview: overview,
      poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
      release_date: release_date,
      runtime: runtime,
      rating: Math.round(vote_average / 2),
      vote_count: vote_count,
      cast: cast.splice(0, 6),
    };
    res.status(200).json({
      success: true,
      data: movieData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server Error",
    });
  }
};

//@desc Get all the genres list
//@route GET /media/genres
exports.getAllGenres = async (req, res, next) => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    const data = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    res.status(200).json({
      success: true,
      data: data.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server Error",
    });
  }
};

//@desc Get movies of a specific genre
//@route GET /media/movies/:genre
exports.getMoviesByGenre = async (req, res, next) => {
  try {
    const { genre } = req.params;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&with_genres=${genre}&with_watch_monetization_types=flatrate`;
    const data = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    res.status(200).json({
      success: true,
      data: data.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server Error",
    });
  }
};

//@desc  Get recommended movies
//@route GET /media/recommendedmovies/:movie_id

exports.getRecommendedMovies = async (req,res,next) =>{
  try {
    const {movie_id} = req.params;
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    const data = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    })
    res.status(200).json({
      success: true,
      count: data.data["results"].length,
      data: data.data
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server Error",
    });
  }
}
