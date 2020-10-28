import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Favorites from './components/Favorites';
import TvShows from './components/TvShows';
import Genres from './components/Genres';
import Cast from './components/Cast';

const baseURL = 'https://api.tvmaze.com';
const tvShowsURL = `${baseURL}/shows`;

function App() {

  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState(new Set());
  const [tvShowIds, setTvShowIds] = useState([]);

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

  const addOrRemoveTvShowId = (clickedTvShowId, history) => {
    const favoritedTvShowId =
      tvShowIds.find(tvShowId => tvShowId === clickedTvShowId);

    let updatedFavoriteTvShows;
    if (favoritedTvShowId) {
      updatedFavoriteTvShows =
        tvShowIds.filter(tvShowId => tvShowId !== clickedTvShowId);
      setTvShowIds(updatedFavoriteTvShows);
    } else {
      updatedFavoriteTvShows = [...tvShowIds, clickedTvShowId];
      setTvShowIds(updatedFavoriteTvShows);
    }

    history.push({ search: `?shows=[${updatedFavoriteTvShows}]`});
  }

  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/favorites" render={(routeProps) => {
        return <Favorites
          {...routeProps}
          tvShows={tvShows}
          tvShowIds={tvShowIds}
          setTvShowIds={setTvShowIds}
          addOrRemoveTvShowId={addOrRemoveTvShowId}
        />
      }} />
      <Route exact path="/shows" render={(routeProps) => {
        return <TvShows
          {...routeProps}
          tvShows={tvShows}
          tvShowIds={tvShowIds}
          setTvShowIds={setTvShowIds}
          addOrRemoveTvShowId={addOrRemoveTvShowId}
        />
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
