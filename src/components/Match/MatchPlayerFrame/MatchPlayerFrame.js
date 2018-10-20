import React from 'react';
import classes from './MatchPlayerFrame.css';

const matchPlayerFrame = props => {

    return(
        <div className={classes.MatchPlayerFrame}>
        <div>{props.username}</div>
        </div>
    )
}

export default matchPlayerFrame;