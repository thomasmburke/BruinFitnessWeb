import React from "react";
import HomeCarousel from "./HomeCarousel";
import HomeJumbotron from "./HomeJumbotron";

function Home() {
  return (
    <React.Fragment>
      <h1>Home</h1>
      <HomeCarousel />
      <HomeJumbotron />
    </React.Fragment>
  );
}

export default Home;
