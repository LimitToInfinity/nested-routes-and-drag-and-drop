import React from 'react';

function TvShowCard({ tvShow }) {
  return (
    <div className="tv-show-card">
      <h3>{tvShow.name}</h3>
      <img src={tvShow.image.medium} alt={tvShow.name} />
    </div>

  );
}

export default TvShowCard;