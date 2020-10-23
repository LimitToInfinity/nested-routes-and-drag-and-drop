import React from 'react';

function PersonCard({ person }) {
  return (
    <div className="person-card">
      <h3>{person.name}</h3>
      <img
        src={person.image ? person.image.medium : ''}
        alt={person.name}
      />
    </div>

  );
}

export default PersonCard;