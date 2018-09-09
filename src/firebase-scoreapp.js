import firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBIHrb20BX4dvFaZJWe9WkUTSeL7hHwE04",
    authDomain: "score-app-b69dc.firebaseapp.com",
    databaseURL: "https://score-app-b69dc.firebaseio.com",
    projectId: "score-app-b69dc",
    storageBucket: "score-app-b69dc.appspot.com",
    messagingSenderId: "989567740894"
  };
  const firebasedb = firebase.initializeApp(config);
  export default firebasedb;