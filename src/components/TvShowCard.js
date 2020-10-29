import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';

function TvShowCard({ tvShow, isFavorited, addOrRemoveTvShowId, history }) {

  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => setFavorite(isFavorited), [isFavorited]);

  const addToFavorites = () => {
    setFavorite(!isFavorite);
    addOrRemoveTvShowId(tvShow.id, history);
  }

  return (
    <div className="tv-show-card">
      <Link to={`/shows/${tvShow.id}`}>
        <h3>{tvShow.name}</h3>
        <img src={tvShow.image.medium} alt={tvShow.name} />
      </Link>
      <button onClick={addToFavorites}>
        <FontAwesomeIcon
          icon={isFavorite ? fasFaStar : farFaStar}
        />
      </button>
    </div>

  );
}

export default TvShowCard;