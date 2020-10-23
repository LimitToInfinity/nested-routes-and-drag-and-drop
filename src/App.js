import React, { useEffect, useState } from 'react';
import './App.css';

import Header from './components/Header';

const baseURL = 'https://api.tvmaze.com';
const tvShowsURL = `${baseURL}/shows`;

function App() {

  const [tvShows, setTvShows] = useState([]);

  const getTvShows = async () => {
    const response = await fetch(tvShowsURL);
    const tvShows = await response.json();
    setTvShows(tvShows);
  }

  useEffect(() => {
    getTvShows();
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
