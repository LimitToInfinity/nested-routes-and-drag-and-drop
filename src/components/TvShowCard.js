import React from 'react';

function TvShowCard({ tvShow }) {
  return (
    <div className="tv-show-card">
      <h3>{tvShow.name}</h3>
      <img src={tvShow.image.medium} alt={tvShow.name} />
      <button><i class="far fa-star"></i></button>
    </div>

  );
}

export default TvShowCard;