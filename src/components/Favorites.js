import React, { useEffect } from 'react';

import TvShowCard from './TvShowCard';

function Favorites({ tvShows, tvShowIds, setTvShowIds, addOrRemoveTvShowId, location, history }) {

  const queryParams = new URLSearchParams(location.search);
  const searchGenre = queryParams.get('genre');
  
  useEffect(() => {
    const favoritedShows = JSON.parse(queryParams.get('shows')) || tvShowIds;
    setTvShowIds(favoritedShows);
    if (!searchGenre) {
      history.push({search: `?shows=[${favoritedShows}]`});
    }
  }, []);

  const favoriteTvShows = tvShowIds.reduce((shows, tvShowId) => {
    const favoriteTvShow = tvShows.find(tvShow => tvShow.id === tvShowId);
    if (favoriteTvShow) { shows.push(favoriteTvShow) };
    return shows;
  }, []);

  const displayTvShows = () => {
    return favoriteTvShows.map(tvShow => {
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
    <section className="favorite-tv-shows">
      { displayTvShows() }
    </section>
  );
}

export default Favorites;