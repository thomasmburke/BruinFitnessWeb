import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

function AboutTwoColumn2() {
  return (
    <div className="row px-4 pb-3">
      <div className="col-md-5 my-auto">
        <ScrollAnimation animateIn="slideInLeft" animateOnce={true}>
          <img className="round img-fluid" src="/images/founders.jpg" alt="" />
        </ScrollAnimation>
      </div>

      <div className="col-md-7 my-auto">
        <ScrollAnimation animateIn="slideInRight" animateOnce={true}>
          <h4 className="py-2 text-left">
            A Message From The Bruin Fitness Founders
          </h4>
          <p className="pt-2">
            "Fitness is a lifestyle. We believe that healthy bodies make happy
            people. We have been enthusiasic about fitness our whole lives and
            are happy to share our experiences with all of our members. We
            strive to make fitness fun, provide a place for competitors, while
            still making beginners feel welcome. We hope Bruin Fitness is a good
            fit for you!"
          </p>
          <h5>-Tom B. & Margaux C., Co-Founders</h5>
        </ScrollAnimation>
      </div>
    </div>
  );
}

export default AboutTwoColumn2;
