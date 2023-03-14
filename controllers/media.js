const axios = require("axios");
const asyncHandler = require("../middleware/async");
// @descE   Get all new movies
//@route    GET /media
exports.getNewMedia = asyncHandler(async (req, res, next) => {
  const {page} = req.query;
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
  const data = await axios.get(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  const { results } = data.data;
  res.status(200).json({
    success: true,
    count: results.length,
    data: data.data,
  });
});

// @desc   Get a movie
//@route   GET /media/find/:name
exports.getByTitle = asyncHandler(async (req, res, next) => {
  const { name } = req.params;
  const {page} = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${name}&page=${page}&include_adult=false`;
  const data = await axios.get(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  const { results } = data.data;
  res.status(200).json({
    success: true,
    count: results.length,
    data: data.data,
  });
});

//@desc      Get data by click on media
//@route     GET /media/:id
exports.getMetaData = asyncHandler(async (req, res, next) => {
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
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    vote_count,
    vote_average,
    backdrop_path,
    tagline
  } = movieMetaData.data;

  const movieData = {
    title: title,
    genres: genres,
    original_language: original_language,
    overview: overview,
    vote_average: vote_average,
    poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
    backdrop_path:`https://image.tmdb.org/t/p/w500/${backdrop_path}`,
    release_date: release_date,
    runtime: runtime,
    rating: vote_average / 2,
    vote_count: vote_count,
    cast: cast.splice(0, 6),
    tagline:tagline
  };
  res.status(200).json({
    success: true,
    data: movieData,
  });
});

//@desc     Get all the genres list
//@route    GET /media/genres
exports.getAllGenres = asyncHandler(async (req, res, next) => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const data = await axios.get(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  const response = data.data;
  // response.genres.filter(item => delete item['id'])
  res.status(200).json({
    success: true,
    data: response,
  });
});

//@desc      Get movies of a specific genre
//@route     GET /media/movies/:genre
exports.getMoviesByGenre = asyncHandler(async (req, res, next) => {
  const { genre } = req.params;
  const {page} = req.query
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genre}&with_watch_monetization_types=flatrate&page=${page}`;
  const data = await axios.get(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  res.status(200).json({
    success: true,
    data: data.data,
  });
});

//@desc     Get recommended movies
//@route    GET /media/recommendedmovies/:movie_id
exports.getRecommendedMovies = asyncHandler(async (req, res, next) => {
  const { movie_id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
  const data = await axios.get(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  res.status(200).json({
    success: true,
    count: data.data["results"].length,
    data: data.data,
  });
});
//@desc     Get recommended movies
//@route    GET /media/languages
exports.getCountries = asyncHandler(async (req, res, next) => {
  const url = `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_API_KEY}`;
  const data = await axios.get(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  let countries = data.data
  countries = countries.filter(country => (delete country['name'], country['english_name']!=='No Language'))
  res.status(200).json({
    success: true,
    count: countries.length,
    data: countries,
  });
});

//@desc     Get recommended movies
//@route    GET /media/languages/:language
exports.getMoviesByLanguage = asyncHandler(async (req,res,next)=> {
  const {language} = req.params;
  const {page} = req.query;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=${language}&with_watch_monetization_types=flatrate&page=${page}`
  const data = await axios.get(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  let movies = data.data
  res.status(200).json({
    success: true,
    count: movies.length,
    data: movies,
  });
})

//@desc     Get top rated movies
//@route    GET /media/toprated
exports.getTopRated = asyncHandler(async (req,res,next) =>{
  const {page} = req.query;
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
  const data = await axios.get(url)
  let movies = data.data
  res.status(200).json({
    success: true,
    count: movies.length,
    data: movies,
  });
})

//@desc Get movie Trailer
//@route GET /media/movie/trailer/:id
exports.getTrailer = asyncHandler(async (req,res,next) =>{
  const {id} = req.params
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  const data = await axios.get(url)
  let {results} = data.data
  results = results?.filter((video) => video.type==='Trailer')[0]
  res.status(200).json({
    success:true,
    data: results
  })
})