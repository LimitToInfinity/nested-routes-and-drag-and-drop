import React from 'react';
import { Link } from 'react-router-dom';

import GenreCard from './GenreCard';

function Genres({ genres }) {

  const displayGenres = () => {
    return Array.from(genres).map(genre => {
      return <Link key={genre} to={`/shows?genre=${genre}`}>
        <GenreCard genre={genre} />
      </Link>
    })
  }

  return (
    <section className="genres">
      { displayGenres() }
    </section>
  );
}

export default Genres;