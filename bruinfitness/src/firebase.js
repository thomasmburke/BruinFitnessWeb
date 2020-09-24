// import * as firebase from "firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";

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
firebase.initializeApp(config);

export default firebase;
