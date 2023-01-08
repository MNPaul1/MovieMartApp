import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./DisplayLayout.css";
import ISO6391 from 'iso-639-1';
import { Pagination } from "@mui/material";
import MovieContainer from "../MovieContainer";
import LinearProgress from '@mui/material/LinearProgress';

export default function DisplayLayout() {
  let locaion = useLocation();
  let pathname = locaion.pathname;
  let type = pathname.split("/");
  type = type.slice(-1)[0] === "" ? "Home" : type.slice(-1)[0];
  
  const id = locaion.state?.id;
  const language = locaion.state?.language;
  const name = locaion.state?.name;
  const [currentMedia, setMedia] = useState([]);
  const [page,setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    async function fetchMedia(page) {
      let mediaItems, query;
      if (type === "Home" || type === "") {
        query = `/media`
      } else if(id) {
        query = `/media/movies/${id}`
      } else if(name){
        query = `/media/find/${name}`
      }else if(language){
        query = `/media/languages/${language}`
      }
      setLoading(true)
      mediaItems = await axios.get(`${query}?page=${page}`)
      let { data } = mediaItems.data;
      setMedia(data);
      setLoading(false)
    }
    fetchMedia(page);
  },[locaion, id, type, name, language, page])
  useEffect(()=> {
    setPage(1)
  },[type])
  const handlePagination = (e,value) =>{
    setPage(value)
  }

  return (
    <>
    {loading&&<LinearProgress />}
    {!loading&&<div className="main-container">
      <h1>
        {language?ISO6391.getName(language):type.replaceAll("-"," ").toUpperCase()} <div className="underline"></div>
      </h1>
      {currentMedia.results?.length===0&&<div>No result found</div>}
      {currentMedia.results?.length!==0&&<div className="pagination">
        <Pagination count={currentMedia.total_pages} page={page} sx={{"& .MuiPaginationItem-root": {color: "#fff"}}} variant="outlined" color="primary" onChange={handlePagination} />
      </div>}
      <div>

      {currentMedia.results?.map((item,key) => (
        <MovieContainer key={key} item={item} />
      ))}
      </div>
      {currentMedia.results?.length!==0&&<div className="pagination">
        <Pagination count={currentMedia.total_pages} page={page} sx={{"& .MuiPaginationItem-root": {color: "#fff"}}} variant="outlined" color="primary" onChange={handlePagination} />
      </div>}
    </div>}
    </>
  );
}
