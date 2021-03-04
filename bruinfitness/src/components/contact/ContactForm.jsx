import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from 'react';
import ScrollAnimation from "react-animate-on-scroll";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useFirestore } from "reactfire";
import "./ContactForm.css";

/**
 * The contact page is responsible for taking user input in a form, writing that to Firestore which
 * then triggers a Firebase mail trigger extension to send an email to the Bruin Fitness team
 * indicating a new potentially interested user. Our team will respond within 48 hours answering any
 * questions they may have and how to get them started.
 *
 * To set up a SMTP connection URI you need to set up an SMTP Relay on Sendgrid: https://app.sendgrid.com/guide/integrate
 * When configuring a SMTP connection URI for your Firebase extension it should take the form:
 * smtps://apikey:SUPER_COMPLEX_PASSWORD@smtp.sendgrid.net:465
 *
 * Sendgrid requires you to verify your sender ID via single sender verification or domain authentication for this extension to work: https://sendgrid.com/docs/for-developers/sending-email/sender-identity/ . Meaning that the FROM address set in the Firebase Extension configuration needs to be verified at the above address.
 * The Free SendGrid account allows for 100 emails/day, which should be enough quota for this app, If it is not that is probably a good thing.. or we have some spammers we need to limit.
 *
 * If using gmail / GSuite directly make sure to enable the two below (not recommended and not what this does...):
 * https://www.google.com/settings/security/lesssecureapps
 * https://accounts.google.com/DisplayUnlockCaptcha
 */

function ContactForm() {

  // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
  const firestore = useFirestore();
  // Get a reference to the mail collection
  const mailRef = firestore.collection('mail');

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [fancySubmitClass, setFancySubmitClass] = useState('');
  const isCheckHidden = useRef(true);

  const handleSubmit = (event) => {
    // When the form is submitted we write the corresponding workoutInfo to Firestore
    event.preventDefault();
    
    // Write to Firestore mail collection
    mailRef
    .add({
      to: "tburke@bu.edu",
      message: {
        subject: "A new customer is inquiring about the gym!",
        html: `Please follow up on the potential customer inquiry documented below.<br /><strong>Website user: </strong>${formName}<br /><strong>Email: </strong>${formEmail}<br /><strong>Message: </strong>${formMessage}`,
      },
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

    // TODO: Reset the form

    // trigger submit button animation
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
          </ScrollAnimation>
        </div>
    )
}

export default ContactForm