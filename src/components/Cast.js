import React, { useEffect, useState } from 'react';

import PersonCard from './PersonCard';

const baseURL = 'https://api.tvmaze.com';
const tvShowsURL = `${baseURL}/shows`;

function Cast({ tvShow }) {

  const [cast, setCast] = useState([]);
  
  const getTVShowCast = async () => {
    const response = await fetch(`${tvShowsURL}/${tvShow.id}/cast`);
    const tvShowCast = await response.json();
    setCast(tvShowCast);
  }

  useEffect(getTVShowCast, []);

  console.log(cast);

  const displayActors = () => {
    return cast.map(member => {
      return <PersonCard
        key={`${member.person.id}${member.character.id}`}
        person={member.person}
      />
    })
  }

  const displayCharacters = () => {
    return cast.map(member => {
      return <PersonCard
        key={`${member.person.id}${member.character.id}`}
        person={member.character}
      />
    })
  }

  return (
    <section className="cast">
      <div className="actors">
        { displayActors() }
      </div>
      <div className="characters">
        { displayCharacters() }
      </div>
    </section>
  );
}

export default Cast;