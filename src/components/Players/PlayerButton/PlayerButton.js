import React from 'react';
import classes from './PlayerButton.css';
import profilePic from '../../../assets/Images/profilePic.jpg';

const playerButton = (props) => (
    <div className={classes.PlayerButton}>
        <div className={classes.Image}>
            <img src={profilePic} alt="Profilepic"></img>
        </div>
        <div className={classes.Name}>
            {props.name}
        </div>
        <div className={classes.PlayerNumber}>
            <h1>{props.number}</h1>
        </div>
    </div>
)

export default playerButton;