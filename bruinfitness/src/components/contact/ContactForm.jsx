import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";
import "./ContactForm.css";

function ContactForm() {
    return (
        <div className="col-md-7">
          <ScrollAnimation animateIn="slideInRight" animateOnce={true}>
            <h4 className="text-left py-3">We'd be happy to hear from you!</h4>
            <form id="contact-form">
              <div className="alert">Message Sent</div>
              <div className="controls">
                <div className="form-group">
                  <input
                    id="form_name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name."
                    required="required"
                  />
                </div>

                <div className="form-group">
                  <input
                    id="form_email"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email."
                    required="required"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    id="form_message"
                    name="message"
                    className="form-control"
                    placeholder="Add your message."
                    rows="4"
                    required="required"
                  ></textarea>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-md"
                  value="Send message"
                />
              </div>
            </form>
            </ScrollAnimation>
        </div>
    )
}

export default ContactForm
