import "./Navbar.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import slugify from "react-slugify";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  //Detect if it's languages hover or genres hover because both uses same components it helps to detect the req.
  const [options, setOptions] = useState(0);
  //Gives all the values of languages
  const [languageOptions, setLanOptions] = useState([]);
  //Gives all the genres provided by the API
  const [genre, setGenres] = useState([]);
  //helps to redirect the page to another route
  const navigate = useNavigate();

  //State to determine whether to use close or menu icon
  const [icon, setIcon] = useState(0);
  // window width will help to set navbar behaviour 
  const [windowWidth, setWidth] = React.useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    async function fetchGenres() {
      const res = await axios.get("/media/genres");
      const languageRes = await axios.get("/media/languages");
      const { data } = res.data;
      const { data: languages } = languageRes.data;
      const allGenres = data.genres;
      //Updating the states
      setGenres(allGenres);
      setLanOptions(languages);
    }
    //call data from the apis
    fetchGenres();
    //setting windowWidth everytime when there is resize
    window.addEventListener("resize", handleResize, false);
    if (windowWidth <= 550) {
      const menuIcon = document.querySelector(".menu");
      const closeIcon = document.querySelector(".close");
      if (icon === 0) {
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
        document.getElementsByClassName(`nav-items`)[0].style.display = "none";
      } 
      else {
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
        document.getElementsByClassName(`nav-items`)[0].style.display = "block";
      }


    }else{
      // setIcon(preValue => preValue===0?1:0)
      document.getElementsByClassName(`nav-items`)[0].style.display = "flex";
    }
  }, [icon, windowWidth]);

  const handleOnSearchClick = (e) => {
    const { value } = e.target;
    if (value === "") {
      navigate("/");
    } else {
      navigate(`/search/${slugify(value)}`, { state: { name: value } });
    }
  };
  const MouseEnter = (e) => {
    const { className: parent } = e.target;
    setOptions(parent === "country" ? 0 : 1);
    document.querySelector(
      `.${parent ? parent : "country"} .optionsContainer`
    ).style.display = "flex";
  };

  const MouseLeave = (e) => {
    document.getElementsByClassName(`optionsContainer`)[options].style.display =
      "none";
    setIcon((preValue) => (preValue === 0 ? 1 : 0));
  };

  const OptionsContainer = (props) => {
    const { options, type } = props;
    return (
      <div className="optionsContainer" onClick={() => setIcon((preValue) => (preValue === 0 ? 1 : 0))}>
        {options?.map((item, key) => (
          <Link
            key={key}
            to={`${
              type === "country"
                ? `countries/${item.iso_639_1}`
                : `genre/${item.name}`
            }`}
            state={
              type === "country"
                ? { language: item.iso_639_1 }
                : { id: item.id }
            }
          >
            {item.name ? item.name : item.english_name}
          </Link>
        ))}
      </div>
    );
  };
  return (
    <div className="nav-body" onBlur={() => setIcon(0)}>
      <Link to="/" className="heading" onClick={() => setIcon(0)}>MovieMart</Link>
      <div className="nav-items"  onBlur={() => setIcon(0)}>
        <ul>
          <Link to="/" onClick={MouseLeave}>
            Home
          </Link>
          <nav className="country" onClick={MouseEnter}>
            Languages
            <OptionsContainer type="country" options={languageOptions} />
          </nav>
          <nav className="genre" onClick={MouseEnter}>
            Genre
            <OptionsContainer type="genre" options={genre} />
          </nav>
          <Link to="/" onClick={MouseLeave}>
            TV Shows
          </Link>
        </ul>
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={handleOnSearchClick}
            onKeyDown = {(e) => e.key==='Enter'?MouseLeave:'' }
          />
        </div>
      </div>
      <div className="menu-bar">
        <nav className="menu" id="menu" onClick={() => setIcon((preValue) => (preValue === 0 ? 1 : 0))}>
          <MenuIcon />
        </nav>
        <nav className="close" id="close" onClick={() => setIcon((preValue) => (preValue === 0 ? 1 : 0))}>
          <CloseIcon />
        </nav>
      </div>
    </div>
  );
}
