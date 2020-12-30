import 'firebase/auth';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth } from 'reactfire';

const SignInForm = () => {
    const auth = useAuth;
  
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
          auth.GoogleAuthProvider.PROVIDER_ID,
          auth.EmailAuthProvider.PROVIDER_ID],
          // Redirect to / (the home page) after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
          signInSuccessUrl: '/',
    //   callbacks: {
    //     // Avoid redirects after sign-in.
    //     signInSuccessWithAuthResult: () => false
    //   }
    };
  
    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
        </div>
    );
  };

export default SignInForm
