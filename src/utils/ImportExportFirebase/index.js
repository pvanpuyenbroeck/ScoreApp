const port = process.env.port || 3000;
const express = require('express');
const path = require('path');
const axios = require('axios');
// import {firebaseConfigTest, firebaseConfigLive} from './firebase';

// import firebase from 'firebase';
// const authorize = () => {
//     var serviceAccount = require("../score-app-b69dc-firebase-adminsdk-8xbui-9c0061900c.json");

//     // Define the required scopes.
//     var scopes = [
//         "https://www.googleapis.com/auth/userinfo.email",
//         "https://www.googleapis.com/auth/firebase.database"
//     ];

//     // Authenticate a JWT client with the service account.
//     var jwtClient = new google.auth.JWT(
//         serviceAccount.client_email,
//         null,
//         serviceAccount.private_key,
//         scopes
//     );

//     // Use the JWT client to generate an access token.
//     jwtClient.authorize(function (error, tokens) {
//         if (error) {
//             console.log("Error making request to generate access token:", error);
//         } else if (tokens.access_token === null) {
//             console.log("Provided service account does not have permission to generate access tokens");
//         } else {
//             var accessToken = tokens.access_token;
//             console.log(accessToken);
//             return accessToken;
//         }
//     });
// }

const backupTable = (tableName) => {
    return axios.get(`https://mvcscorelive.firebaseio.com/${tableName}.json`).then(response => {
        axios.put(`https://mvcbackup-a8b15.firebaseio.com/${tableName}.json`, response.data).then(res => {
            console.log("success!");
        }).catch(error => {
            console.log(error.data);
        });
    }).catch(error => {
        console.log(error.data);
    }
    );
}

const app = express()
// const firebaseApp = firebaseconfig.firebaseConfigTest;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get("/transferTables", (req, res) => {
    // const firebaseTest = firebase.initializeApp(firebaseConfig);
    backupTable('Arenas');
    backupTable('Players');
    backupTable('Teams');
    res.send("success");
})
// app.use(bodyParser.json)

app.listen(port, () => console.log("Listening on port 3000.."));