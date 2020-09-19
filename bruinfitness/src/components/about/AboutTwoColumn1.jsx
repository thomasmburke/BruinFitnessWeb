import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

function AboutTwoColumn1() {
  return (
    <ScrollAnimation animateIn="fadeIn">
      <div>
        <div class="row px-4">
          <div class="col-md-7 p-4">
            <h4>WE ARE BRUIN FITNESS</h4>
            {/* <!-- Border Blue --> */}
            <hr className="w-25 mt-3 mb-4" />
            <p className="text-center">
              We at the gym pride ourselves on changing the lives of as many
              individuals as possible. We've taken years of planning and
              developing Bruin Fitness layout for the most optimal fitness
              experience possible for our fantastic members.
            </p>
            <p className="text-center">
              Our goal is to have a one on one personal experience for our
              members who we often refer to as our extended family. Learn more
              about us by getting to know and love our facility.
            </p>
          </div>

          <div className="col-md-5 p-4 my-auto">
            <img src="/images/tomburke.jpg" class="img-fluid" alt="" />
          </div>
        </div>
        {/* <!-- End Two Column Section Row --> */}
      </div>
    </ScrollAnimation>
  );
}

export default AboutTwoColumn1;
