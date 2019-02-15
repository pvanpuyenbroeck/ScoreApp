import React,{Component, useState} from 'react';
import firebaseApp from '../../firebase-scoreapp';
import firebase from 'firebase';
import classes from './authenticators.css';
import GoogleButton from 'react-google-button';

class Authenticators extends Component {
    
    googleAuthenticateHandler = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            //google access token
            const token = result.credential.accessToken;
            console.log(token);
            //signed in user info
            const user = result.user;
            console.log(user);
            //...
        }).catch((error) => {
            //Handle error here
            const errorCode = error.code;
            const errorMessage = error.message;
            //the email of the user's account used.
            const email = error.email;
            //the firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
        })
    }
    render(){
    return(
        <React.Fragment>
            <GoogleButton onClick={this.googleAuthenticateHandler}/>
        </React.Fragment>
    )
    }
}

export default Authenticators;
