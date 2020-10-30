import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';

function TvShowCard({
  tvShow, index, isFavorited, addOrRemoveTvShowId, history
}) {

  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => setFavorite(isFavorited), []);

  const addToFavorites = () => {
    setFavorite(!isFavorite);
    addOrRemoveTvShowId(tvShow.id, history);
  }

  return (
    <Draggable draggableId={`${tvShow.id}`} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="tv-show-card"
        >
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
      )}
    </Draggable>

  );
}

export default TvShowCard;