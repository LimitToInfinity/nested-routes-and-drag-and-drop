import React from 'react';

function Home() {
  return (
    <section className="home">
      <iframe
        src="https://www.youtube.com/embed/8UPOBxxPspc"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        autoPlay
        title="Family Guy, do you listen to yourself when you talk"
      ></iframe>
    </section>
  );
}

export default Home;