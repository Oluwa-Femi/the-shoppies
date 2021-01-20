import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import {DebounceInput} from 'react-debounce-input';

import "./Styles/List.css";

const REACT_APP_API_KEY=process.env.REACT_APP_API_KEY;

const List = props => {
  const [movies, setMovies] = useState([]);
  const [responseString, setResponseString] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputField, setInputField] = useState("")

  const onChangeSearch = e => {
    const input = e.target.value;
    setInputField(input)
  }

    useEffect(() => {
        setLoading(true)
        axios
          .get(`${REACT_APP_API_KEY}&s=${inputField}&type=movie`)
          .then(response => {
            inputField.length <= 2 ? setResponseString("") : setResponseString(response.data.Response)
            if (response.data.Response === "True") {
              setMovies(response.data.Search);
            } else {
              setMovies([]);
            }
            setLoading(false)
          })
          .catch(error => {
            props.notify(error.message)
          });
      }, [inputField, props])

  return (
    <div className="movie-list">
    <div className="search">
        <DebounceInput minLength={2} debounceTimeout={300} placeholder="Search movie" onChange={onChangeSearch} />
    </div>
    {loading ? <div className="spinner"></div> : <div className="movie-results">
        {movies?.length ? movies.map(movie => (
          <div key={movie.imdbID}><MovieFeatures movie={movie} nomineesList={props.nomineesList} addToNomineesList={props.addToNomineesList} nominationFull={props.nominationFull} /></div>
        )) : responseString === "False" ? <div className='default-message'>No movies found</div> : <div className='default-message'>Type movie name above</div>}
      </div>}
    </div>
  );
}

function MovieFeatures({ movie, nomineesList, addToNomineesList, nominationFull }) {
  const { Title, Year, imdbID, Poster } = movie;
  return (
    <Card title={Title} year={Year} imdbID={imdbID} poster={Poster} nomineesList={nomineesList} addToNomineesList={addToNomineesList} nominationFull={nominationFull} />
  );
}

export default List;