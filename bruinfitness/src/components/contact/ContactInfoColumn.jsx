import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";

function ContactInfoColumn() {
    return (
        <div className="col-md-5 text-left mt-lg-3">
          <ScrollAnimation animateIn="slideInLeft" animateOnce={true}>
            <h2 className="text-left pb-2">
              DROP US A LINE, ASK US QUESTIONS, HIT US UP. WE ARE HERE TO CHAT!
            </h2>
            <p>
              Use the form to send us an email. We typically will respond back
              within one business day. Alternatively, feel free to contact us
              via phone or email.
            </p>
            <h3 className="text-left pb-2">SHOOT US A CALL</h3>
            <p>
              <strong>PHONE: </strong>(888) 555-5555<br /><strong
                >EMAIL: </strong
              >info@bruinfitness.com<br /><strong>LOCATION: </strong>100 Street
              Name, Brookline, MA 02445
            </p>
            </ScrollAnimation>
        </div>
    )
}

export default ContactInfoColumn
