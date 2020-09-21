import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "./CalloutText.css";

function CalloutText() {
  return (
    <React.Fragment>
      <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
        <div className="row mx-5 mb-5 callout-border text-center">
          <div className="col-md-8 col-lg-9 my-auto pb-0 pb-md-2">
            <h4 className="callout-text">
              Would you like to learn more about our gym and classes?
            </h4>
          </div>

          <div className="col-md-4 col-lg-3 pb-2 pb-lg-1 py-1 vcenter align-center">
            <a className="btn btn-primary btn-md" href="/contact">
              Get In Touch
            </a>
          </div>
        </div>
      </ScrollAnimation>
    </React.Fragment>
  );
}

export default CalloutText;
