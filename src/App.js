import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import TvShows from './components/TvShows';
import Genres from './components/Genres';
import Cast from './components/Cast';

const baseURL = 'https://api.tvmaze.com';
const tvShowsURL = `${baseURL}/shows`;

function App() {

  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState(new Set());

  const getTvShows = async () => {
    const response = await fetch(tvShowsURL);
    const tvShowsFromAPI = await response.json();
    setTvShows(tvShowsFromAPI);
    getAndSetGenres(tvShowsFromAPI);
  }

  useEffect(getTvShows, []);

  const getAndSetGenres = (tvShows) => {
    const uniqueGenres = new Set();
    tvShows.forEach(tvShow => {
      tvShow.genres.forEach(genre => uniqueGenres.add(genre));
    });
    setGenres(uniqueGenres);
  }


  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/shows" render={(routeProps) => {
        return <TvShows {...routeProps} tvShows={tvShows} />
      }} />
      <Route path="/shows/:id" render={({ match: { params } }) => {
        return <Cast
          tvShow={tvShows.find(tvShow => tvShow.id === +params.id)}
        />
      }} />
      <Route path="/genres" render={() => {
        return <Genres genres={genres} />
      }} />
    </div>
  );
}

export default App;
