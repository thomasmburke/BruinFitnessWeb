import React from "react";
import "./HomeTwoColumn.css";
import "../common/button.css";

function HomeTwoColumn() {
  return (
    <div className="flex-two-col">
      <div className="col text-col-padding">
        <h2>Sample Two Column Fitness Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <br />
        <a href="/contact" class="btn btn-primary">
          Learn More
        </a>
      </div>
      <div className="col  image-col-padding">
        <img src="/images/hike.jpg" className="img-fluid" />
      </div>
    </div>
  );
}

export default HomeTwoColumn;
