const express = require("express");
const { getNewMedia, getByTitle, getMetaData, getAllGenres, getMoviesByGenre, getRecommendedMovies, getCountries, getMoviesByLanguage } = require("../controllers/media");
const router = express.Router();


router.route("/").get(getNewMedia);
router.route("/genres").get(getAllGenres);
router.route("/languages").get(getCountries);
router.route("/find/:name").get(getByTitle);
router.route("/:id").get(getMetaData);
router.route("/movies/:genre").get(getMoviesByGenre);
router.route("/recommendedmovies/:movie_id").get(getRecommendedMovies);
router.route("/languages/:language").get(getMoviesByLanguage);


module.exports = router;
