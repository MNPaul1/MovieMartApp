const express = require("express");
const { getNewMedia, getByTitle, getMetaData, getAllGenres, getMoviesByGenre, getRecommendedMovies } = require("../controllers/media");
const router = express.Router();


router.route("/").get(getNewMedia);
router.route("/genres").get(getAllGenres);
router.route("/find/:name").get(getByTitle);
router.route("/:id").get(getMetaData);
router.route("/movies/:genre").get(getMoviesByGenre);
router.route("/recommendedmovies/:movie_id").get(getRecommendedMovies);


module.exports = router;
