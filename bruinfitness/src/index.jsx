import React from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider } from "reactfire";
import 'typeface-roboto';
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

var config = {
  apiKey: "AIzaSyAVSJR_4lVFYaFSHIDU_FkKP83-_aZUvI4",
  authDomain: "bruinfitnessprod.firebaseapp.com",
  databaseURL: "https://bruinfitnessprod.firebaseio.com",
  projectId: "bruinfitnessprod",
  storageBucket: "bruinfitnessprod.appspot.com",
  messagingSenderId: "557271418042",
  appId: "1:557271418042:web:d3d583194db226f21e2e83",
  measurementId: "G-3HN3QFT3Q0",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={config}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
