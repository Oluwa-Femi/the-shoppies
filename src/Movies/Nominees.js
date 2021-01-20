import React from 'react';
import { NavLink } from 'react-router-dom';

import "./Styles/Nominees.css";

const Nominees = ({ list, removeFromNomineesList }) => {

  return (
    <div className="nav">
      {/* <NavLink to="/"><div className="home-button">Home</div></NavLink> */}
      <div className="saved-list">
        <h2>Your Nominations List:</h2>
        <h4>Maximum of 5 movie nominations</h4>
        
        <div>
          {list.map(movie => {
            return (
              <div className='nominee-card' key={movie.imdbID}>
                <NavLink className="navlink" to={`/${movie.imdbID}`}>
                  <h3 className="saved-movie">{movie.title}<span className="saved-movie"><em> ({movie.year})</em></span></h3>
                </NavLink>
                <button onClick={() => removeFromNomineesList(movie)}>Remove</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
};

export default Nominees;