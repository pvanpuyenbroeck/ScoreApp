import React from 'react';
import classes from './MatchPlayerFrame.css';

const matchPlayerFrame = props => {

    return(
        <div className={classes.MatchPlayerFrame}>
        <div>{props.playerName}</div>
        </div>
    )
}

export default matchPlayerFrame;