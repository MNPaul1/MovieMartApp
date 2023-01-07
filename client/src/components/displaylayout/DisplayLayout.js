import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./DisplayLayout.css";
import ISO6391 from 'iso-639-1';

import MovieContainer from "../MovieContainer";


export default function DisplayLayout() {
  let locaion = useLocation();
  let pathname = locaion.pathname;
  let type = pathname.split("/");
  type = type.slice(-1)[0] === "" ? "Home" : type.slice(-1)[0];
  
  const id = locaion.state?.id;
  const language = locaion.state?.language;
  const name = locaion.state?.name;
  const [currentMedia, setMedia] = useState([]);

  useEffect(()=>{
    async function fetchMedia() {
      let mediaItems;
      if (type === "Home" || type === "") {
        mediaItems = await axios.get(`/media`);
      } else if(id) {
        mediaItems = await axios.get(`/media/movies/${id}`);
      } else if(name){
        mediaItems = await axios.get(`/media/find/${name}`)
      }else if(language){
        mediaItems = await axios.get(`/media/languages/${language}`)
      }
      let { data } = mediaItems.data;
      setMedia(data);
    }
    fetchMedia();
  },[locaion,id, type,name,language])


  return (
    <div className="main-container">
      <h1>
        {language?ISO6391.getName(language):type.replace("-"," ").toUpperCase()} <div className="underline"></div>
      </h1>
      <div>

      {currentMedia.results?.map((item,key) => (
        <MovieContainer key={key} item={item}/>
      ))}
      </div>
    </div>
  );
}
