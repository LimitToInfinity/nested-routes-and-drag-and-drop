import React from 'react';
import { Link } from 'react-router-dom';

import TvShowCard from './TvShowCard';

function TvShows({ tvShows, location, match }) {

  const queryParams = new URLSearchParams(location.search);
  const searchGenre = queryParams.get('genre');

  let filteredTvShows = [...tvShows];
  if (searchGenre) {
    filteredTvShows = filteredTvShows.filter(tvShow => {
      return tvShow.genres.includes(searchGenre);
    });
  }

  const displayTvShows = () => {
    return filteredTvShows.map(tvShow => {
      return (
        <Link key={tvShow.id} to={`${match.url}/${tvShow.id}`}>
          <TvShowCard tvShow={tvShow} />
        </Link>
      );
    })
  }

  return (
    <section className="tv-shows">
      { displayTvShows() }
    </section>
  );
}

export default TvShows;