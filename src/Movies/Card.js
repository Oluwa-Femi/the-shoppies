import React from 'react';
import { Link } from 'react-router-dom';

import "./Styles/Card.css";

const Card = movie => {
  const { title, year, imdbID, addToNomineesList, nominationFull, nomineesList } = movie;

  const nominateMovie = () => {
    addToNomineesList({
      imdbID,
      title,
      year
    })
  }

  return (
    <div className="card">
       <Link className="card-link" key={imdbID} to={`/${imdbID}`}>
       <h2>{title} (<em>{year}</em>)</h2>
        </Link>
        <button disabled={nominationFull ? true : nomineesList.find((nominee) => nominee.imdbID === imdbID) ? true : false} className="nom-button" onClick={nominateMovie}>Nominate</button>
    </div>
  )
};

export default Card;