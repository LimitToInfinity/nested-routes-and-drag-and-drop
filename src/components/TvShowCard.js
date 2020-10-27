import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-svg-core';

function TvShowCard({ tvShow }) {
  return (
    <div className="tv-show-card">
      <h3>{tvShow.name}</h3>
      <img src={tvShow.image.medium} alt={tvShow.name} />
      <button><FontAwesomeIcon icon={faStar} /></button>
    </div>

  );
}

export default TvShowCard;