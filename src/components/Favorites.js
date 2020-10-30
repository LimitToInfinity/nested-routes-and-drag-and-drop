import React, { useEffect } from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TvShowCard from './TvShowCard';

function Favorites({
  tvShows,
  tvShowIds,
  setTvShowIds,
  addOrRemoveTvShowId,
  location,
  history
}) {

  const queryParams = new URLSearchParams(location.search);
  const searchGenre = queryParams.get('genre');
  
  useEffect(() => {
    const currentShowIds = tvShowIds.length > 0
      ? tvShowIds : queryParams.get('shows');
    const favoritedShowIds = typeof currentShowIds === 'object'
      ? currentShowIds : JSON.parse(currentShowIds);
    setTvShowIds(favoritedShowIds);
    if (!searchGenre) {
      history.push({search: `?shows=[${favoritedShowIds}]`});
    }
  }, [tvShowIds]);

  const favoriteTvShows = tvShowIds.reduce((shows, tvShowId) => {
    const favoriteTvShow = tvShows.find(tvShow => tvShow.id === tvShowId);
    if (favoriteTvShow) { shows.push(favoriteTvShow) };
    return shows;
  }, []);

  const displayTvShows = () => {
    return favoriteTvShows.map((tvShow, index) => {
      return (
        <TvShowCard
          key={tvShow.id}
          tvShow={tvShow}
          index={index}
          isFavorited={tvShowIds.includes(tvShow.id)}
          addOrRemoveTvShowId={addOrRemoveTvShowId}
          history={history}
        />
      );
    })
  }

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) { return; }
    if (destination.droppableId === source.droppableId
      && destination.index === source.index
    ) { return; }

    const reorderedTvShowIds = [...tvShowIds];
    reorderedTvShowIds.splice(source.index, 1);
    reorderedTvShowIds.splice(
      destination.index, 0, parseInt(draggableId, 10)
    );
    setTvShowIds(reorderedTvShowIds);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='1' direction='horizontal'>
        {provided => (
          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="favorite-tv-shows"
          >
            { displayTvShows() }
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Favorites;