"use strict"
import firebase from 'firebase';
import {firebaseConfigTest, firebaseConfigLive} from './firebase';

$(document).onload(() => {
    alert("this works");
    const firebaseTest = firebase.initializeApp(firebaseConfigTest);
    const firebaseProductie = firebase.initializeApp(firebaseConfigLive);

    document.querySelector('#transitionButton').addEventListener('click',(e) => {
        console.log(e);
    })
})