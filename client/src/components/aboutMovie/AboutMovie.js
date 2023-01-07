import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./AboutMovie.css";
import StarIcon from "@mui/icons-material/Star";
import MovieContainer from "../MovieContainer";
import ISO6391 from 'iso-639-1';

export default function AboutMovie() {
  const [movieData, setData] = useState([]);
  const [suggestMovies, setMovies] = useState([]);
  const location = useLocation();
  const { id } = location.state;
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/media/${id}`);
      const suggestedRes = await axios.get(`/media/recommendedmovies/${id}`);
      const { data } = res.data;
      const { data: suggestedData } = suggestedRes.data;
      setData(data);
      setMovies(suggestedData);
    }
    fetchData();
  }, [id]);
  const {
    genres,
    original_language,
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    vote_count,
    backdrop_path,
    tagline,
    rating,
    cast,
  } = movieData;

  const CastContainer = (props) => {
    const { name, profile_path, character } = props.item;
    return (
      <div className="castContainer">
        <img
          src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
          alt={name}
        />
        <nav>{name}</nav>
        <nav>{character}</nav>
      </div>
    );
  };
  
  const RatingStar = () => {
    return (
      <div>
        <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={0.5}
          sx={{fontSize: 'inherit'}}
          emptyIcon={<StarIcon style={{ color: "#555" }} fontSize="inherit" />}
          readOnly
        />
        {vote_count} votes
      </div>
    );
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "0 0 100px 50px #111 inset",
      }}
    >
      <div className="aboutMovie">
        <div className="poster">
          <img src={`${poster_path}`} alt="" />
        </div>
        <div className="movieDescription">
          <h1>{title}</h1>
          <nav>{tagline}</nav>
          <div className="rating">
          <RatingStar />
            <nav>
              {runtime} min | Language: {ISO6391.getName(original_language)}
            </nav>
          </div>
          <div className="genre-container">
            {genres?.map((item, key) => (
              <nav key={key}>{item.name}</nav>
            ))}
          </div>
          <h3>Overview</h3>
          <p>{overview}</p>
          <p><b> Release Date:</b> {release_date}</p>
          <div className="cast">
            <h3>Top Cast</h3>
            {cast?.map((item, key) => (
              <CastContainer key={key} item={item} />
            ))}
          </div>
          <h2>More Like This</h2>
          <div className="suggestionsContainer">
            {suggestMovies.results?.map((item, key) => (
              <MovieContainer key={key} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
