import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

function AboutTwoColumn1() {
  return (
    <React.Fragment>
      <div className="row px-4">
        <div className="col-md-7 p-4 text-center">
          <ScrollAnimation animateIn="slideInLeft" animateOnce={true}>
            <h4>WE ARE BRUIN FITNESS</h4>
            <hr className="w-25 mt-3 mb-4 mx-auto" />
            <p>
              We at the gym pride ourselves on changing the lives of as many
              individuals as possible. We've taken years of planning and
              developing Bruin Fitness layout for the most optimal fitness
              experience possible for our fantastic members.
            </p>
            <p>
              Our goal is to have a one on one personal experience for our
              members who we often refer to as our extended family. Learn more
              about us by getting to know and love our facility.
            </p>
          </ScrollAnimation>
        </div>
        <div className="col-md-5 p-4 my-auto">
          <ScrollAnimation animateIn="slideInRight" animateOnce={true}>
            <img src="/images/tomburke.jpg" class="img-fluid" alt="" />
          </ScrollAnimation>
        </div>
      </div>
      {/* Divider */}
      <hr class="py-4" />
    </React.Fragment>
  );
}

export default AboutTwoColumn1;
