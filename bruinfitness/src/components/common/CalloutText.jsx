import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "./CalloutText.css";

function CalloutText() {
  return (
    <React.Fragment>
      <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
        <div className="flex-callout-box callout-border">
          <div className="col-text">
            <h4 className="callout-text">
              Would you like to learn more about our gym and classes?
            </h4>
          </div>

          <div className="col-btn pb-2 pb-lg-1 py-1">
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
