import React, { useState,useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Components/Header";
import List from './Movies/List';
import  Movie from './Movies/Movie';
import Nominees from "./Movies/Nominees";
import alert from "./images/alert.jpg"

import './App.css';

function App() {
  const savedNominees = localStorage.getItem('nominees');
  const [nomineesList, setNomineesList] = useState(JSON.parse(savedNominees) || []);
  const [nomineesID, setNomineesID] = useState([]);
  const [nominationFull, setNominationFull] = useState(false);

  useEffect(() => {
    localStorage.setItem('nominees', JSON.stringify(nomineesList))
    if (nomineesList.length >= 5) {
      setNominationFull(true)
    } else {
      setNominationFull(false)
    }
  }, [nomineesList])

  const notify = (message) => toast(message);

  const addToNomineesList = movie => {
    if (nomineesList.length < 5) {
        setNomineesList([...nomineesList, movie])
        setNomineesID([...nomineesID, movie.imdbID])
        notify(`${movie.title} (${movie.year}) added to nominations`);
    } else {
      notify(`Cannot add ${movie.title} (${movie.year}), nomination threshold reached`);
    }
  };

  const removeFromNomineesList = movie => {
    setNomineesList(
      [...nomineesList.filter((nominee) => movie.imdbID !== nominee.imdbID)]
    );
    setNomineesID(
      [...nomineesID.filter((nominee) => movie.imdbID !== nominee)]
    );
    notify(`${movie.title} (${movie.year}) removed from nominations`);
  }
  
  return (
    <div>
      <Header />
      <ToastContainer 
        style={{color: "red"}}
      />
      <div className='banner' hidden={nomineesList.length < 5 ? true : false}>
        <img className='banner-img' src={alert} alt="banner" />
        <div class="centered">You have added 5 nominations!</div>
        <p>To edit, remove some movies from the nomination list on the right.</p>
      </div>
      <div className='App'>
        <Nominees list={nomineesList} removeFromNomineesList={removeFromNomineesList} />
        <Route exact path="/" render={props => <List {...props} nomineesID={nomineesID} addToNomineesList={addToNomineesList} nominationFull={nominationFull} nomineesList={nomineesList} notify={notify} />} />
        <Route path='/:movie' render={props => <Movie {...props} notify={notify} addToNomineesList={addToNomineesList} nomineesList={nomineesList} nominationFull={nominationFull} />} />
      </div>
    </div>
  );
}

export default App;
