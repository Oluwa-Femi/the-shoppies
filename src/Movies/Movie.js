import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./Styles/Movie.css";
const REACT_APP_KEY=process.env.REACT_APP_KEY;

const Movie = (props) => {

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false)

  const id = props.match.params.movie;
  const notify = props.notify;

  useEffect(() => {
      setLoading(true)
       axios
        .get(`${REACT_APP_KEY}&i=${id}`)
        .then(response => {
          setMovie(response.data);
          setLoading(false)
        })
        .catch(error => {
            notify(error.message)
        });
  }, [id, notify]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  const { Title, Year, Poster, Genre, Actors, Director, Released, Rated, Plot } = movie;
  return (
    movie && <div className="movie-wrapper">
      <div className="movie-card">
        <img src={Poster} alt="Title"/>
        <h2>{Title}</h2>
        <div className="movie-director">
        <p className="button-cover">
            <span>Year: {Year}</span>
          </p>
          <p>Genre: {Genre}</p>
          <p>Actors: {Actors}</p>
          <p>Director: {Director}</p>
          <p>Released: {Released}</p>
          <p>Rated: {Rated}</p>
          <p>Plot: {Plot}</p>
      </div>
    </div>  
    </div>
  );
}

export default Movie;