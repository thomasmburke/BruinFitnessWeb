import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";

function PricingAsterix() {
    return (
        <ScrollAnimation animateIn="slideInUp" animateOnce={true}>
          <p style={{paddingLeft: "2em", paddingRight: "2em"}}>
            * 20% off memberships for students, teachers, first responders, and
            military
          </p>
        </ScrollAnimation>
    )
}

export default PricingAsterix
