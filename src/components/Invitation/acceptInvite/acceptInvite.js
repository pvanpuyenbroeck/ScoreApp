import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import classes from './acceptInvite.css';

const acceptInvite = (props) => {


    return(
        <div className={classes.AcceptInviteContainer}>
            <div>Component om de uitnodiging te accepteren.</div>
        </div>
    )
}

export default acceptInvite;