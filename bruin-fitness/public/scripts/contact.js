"use strict";
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

// Initialize Firestore
var firestore = firebase.firestore();
// Get a reference to the schedule collection of interest
const mailRef = firestore.collection("mail");
// Get a reference to the contact form
const form = document.querySelector("#contact-form");

form.addEventListener("submit", (e) => {
  // Stops the page redirect
  e.preventDefault();
  // Write to Firestore mail collection
  mailRef
    .add({
      to: "tburke@bu.edu",
      message: {
        subject: "A new customer is inquiring about the gym!",
        text: `The following is the message from the user ${form.name.value} with email ${form.email.value}`,
        html: `The following is the message from the user ${form.name.value} with email ${form.email.value}`,
      },
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});

// function contactFormSubmission() {
//   mailRef
//     .add({
//       name: "Tokyo",
//       country: "Japan",
//     })
//     .then(function (docRef) {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });
//   console.log("the form was successfully submitted!");
// }
