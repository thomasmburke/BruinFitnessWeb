import 'firebase/auth';
import React from 'react';
import Card from "react-bootstrap/Card";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth } from 'reactfire';
import "./SignInForm.css";

const SignInForm = () => {
    const auth = useAuth;
  
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: auth.EmailAuthProvider.PROVIDER_ID,
          // Whether the displayName should be displayed in the sign up page
          requireDisplayName: false
        },
        auth.GoogleAuthProvider.PROVIDER_ID
        ],
        // Redirect to / (the home page) after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
    //   callbacks: {
    //     // Avoid redirects after sign-in.
    //     signInSuccessWithAuthResult: () => false
    //   }
    };
    return (
      <div className="fullpage">
        <div className="wrapper">
          <Card bg="dark" text="light" border="dark" className="text-center">
            {/* <Card.Header>Member Sign In</Card.Header> */}
            <Card.Body>
              <Card.Title>Member Sign In</Card.Title>
              <Card.Text>
                Only members can sign in, to get an account come visit our gym!
              </Card.Text>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
            </Card.Body>
            {/* <Card.Footer className="text-muted"></Card.Footer> */}
          </Card>  
        </div>
        </div>
    );
  };

export default SignInForm
