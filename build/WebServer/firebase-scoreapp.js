const firebase = require('firebase');
const admin = require('firebase-admin');

  // Initialize Firebase test
  // const configTest = {
  //   apiKey: "AIzaSyBIHrb20BX4dvFaZJWe9WkUTSeL7hHwE04",
  //   authDomain: "score-app-b69dc.firebaseapp.com",
  //   databaseURL: "https://score-app-b69dc.firebaseio.com",
  //   projectId: "score-app-b69dc",
  //   storageBucket: "score-app-b69dc.appspot.com",
  //   messagingSenderId: "989567740894"
  // };
  var serviceAccount = require('./mvcscorelive-key.json');

  var configLive = {
    apiKey: "AIzaSyDnEBEMNsfXv3MK8qsiM7t9mo2bzcTgK38",
    authDomain: "mvcscorelive.firebaseapp.com",
    databaseURL: "https://mvcscorelive.firebaseio.com",
    projectId: "mvcscorelive",
    storageBucket: "mvcscorelive.appspot.com",
    messagingSenderId: "940642416708",
    appId: "1:940642416708:web:49ca937e6b5f8db5"
  };

  exports.firebasedb = firebase.initializeApp(configLive);

  exports.firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mvcscorelive.firebaseio.com"
  });
