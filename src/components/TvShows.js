import React, { useEffect } from 'react';

import TvShowCard from './TvShowCard';

function TvShows({ tvShows, tvShowIds, setTvShowIds, addOrRemoveTvShowId, location, history }) {

  const queryParams = new URLSearchParams(location.search);
  const searchGenre = queryParams.get('genre');
  
  useEffect(() => {
    const favoritedShows = JSON.parse(queryParams.get('shows')) || tvShowIds;
    setTvShowIds(favoritedShows);
    if (!searchGenre) {
      history.push({search: `?shows=[${favoritedShows}]`});
    }
  }, [history, queryParams, searchGenre, setTvShowIds, tvShowIds]);

  let filteredTvShows = [...tvShows];
  if (searchGenre) {
    filteredTvShows = filteredTvShows.filter(tvShow => {
      return tvShow.genres.includes(searchGenre);
    });
  }

  console.log(tvShowIds);

  const displayTvShows = () => {
    return filteredTvShows.map(tvShow => {
      return (
        <TvShowCard
          key={tvShow.id}
          tvShow={tvShow}
          isFavorited={tvShowIds.includes(tvShow.id)}
          addOrRemoveTvShowId={addOrRemoveTvShowId}
          history={history}
        />
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