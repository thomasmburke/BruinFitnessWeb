import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from 'react';
import ScrollAnimation from "react-animate-on-scroll";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./ContactForm.css";

function ContactForm() {

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [fancySubmitClass, setFancySubmitClass] = useState('');
  const isCheckHidden = useRef(true);

  const handleSubmit = (event) => {
    // When the form is submitted we write the corresponding workoutInfo to Firestore
    event.preventDefault();
    fancySubmit();
  }

  function fancySubmit(){
    setFancySubmitClass('onSubmitBtnClick');
    setTimeout(function(){
        isCheckHidden.current = false;
        setFancySubmitClass('submitBtnValidate');
        setTimeout(function(){
            isCheckHidden.current = true;
            setFancySubmitClass('');
        }, 1250)
    }, 2250)
}

    return (
        <div className="col-md-7">
          <ScrollAnimation animateIn="slideInRight" animateOnce={true}>
            <h4 className="text-left py-3">We'd be happy to hear from you!</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group controlId="form_name" as={Col}>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" required value={formName} placeholder='Enter your name.' onChange={e => {setFormName(e.target.value)}}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group controlId="form_email" as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required value={formEmail} placeholder='Enter your email.' onChange={e => {setFormEmail(e.target.value)}}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group controlId="form_message" as={Col}>
                  <Form.Label>Message Us!</Form.Label>
                  <Form.Control as="textarea" required rows={4} value={formMessage} placeholder='Add your message.' onChange={e => {setFormMessage(e.target.value)}}/>
                </Form.Group>
              </Form.Row>
              <div className="submitBtnContainer">
                    <button  type="submit" className={`submitBtn ${fancySubmitClass}`}>{isCheckHidden.current ? "SUBMIT" : <FontAwesomeIcon icon={faCheck} color="white"/>}</button>
              </div>
            </Form>
            {/* <form id="contact-form">
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
            </form> */}
            </ScrollAnimation>
        </div>
    )
}

export default ContactForm