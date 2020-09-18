import React from "react";
import HomeCarousel from "./HomeCarousel";
import HomeJumbotron from "./HomeJumbotron";
import HomeTwoColumn from "./HomeTwoColumn";

function Home() {
  return (
    <React.Fragment>
      <HomeCarousel />
      <HomeJumbotron />
      <HomeTwoColumn />
    </React.Fragment>
  );
}

export default Home;
