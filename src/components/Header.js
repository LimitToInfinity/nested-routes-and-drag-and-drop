import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import Logo from '../assets/images/android-chrome-192x192.png';

function Header() {

  return (
    <header>
      <Link id="logo" exact to="/">
        <img src={Logo} alt="color tv logo" />
      </Link>

      <nav>
        <NavLink to="/shows">Shows</NavLink>
        <NavLink to="/genres">Genres</NavLink>
      </nav>
    </header>
  );
}

export default Header;