const port = process.env.port || 3000;
const express = require('express');
const path = require('path');
const firebaseconfig = require('./js/firebase');
const firebase = require('firebase/app');
require("firebase/database");
// import {firebaseConfigTest, firebaseConfigLive} from './firebase';

// import firebase from 'firebase';


const app = express();
// const firebaseApp = firebaseconfig.firebaseConfigTest;

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.get("/transferTables", (req,res) => {
    // const firebaseTest = firebase.initializeApp(firebaseConfig);
    firebase.database().ref()('/Arenas').once('value').then(arenas => {
        console.log(arenas.val());
    })

})
// app.use(bodyParser.json)

app.listen(port, () => console.log("Listening on port 3000.."));