import React from 'react'
import Rating from '@mui/material/Rating'
import { Link } from "react-router-dom";
import slugify from 'react-slugify';
import StarIcon from '@mui/icons-material/Star';

export default function MovieContainer(props) {
    const {item} = props
    const RatingContainer = () =>{
      return <nav><Rating name="half-rating-read" defaultValue={item.vote_average/2 } precision={0.5} sx={{fontSize:'inherit'}} emptyIcon={<StarIcon style={{ color: "#555" }} fontSize="inherit" />} readOnly/></nav>
    }
  if(item.poster_path){

    return (
      <Link to={`/movie/${slugify(item.title)}`} state= {{ id: item.id }} className="movie-container">
        <img
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          width='500'
          height='auto'
          alt={item.title}
        />
        <p>{item.title.length>20?`${item.title.slice(0,19)}...`:item.title}</p>
        <nav>{item.release_date.split("-")[0]}</nav>
        <RatingContainer />
        <nav>Movie</nav>
      </Link>
  )
}
}
