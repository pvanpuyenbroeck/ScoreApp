import React from 'react';
import classes from './Match.css';

const Match = (props) => (
    <div className={classes.Match}>
        <div>Afbeelding komt hier</div>
        <div>
            {props.opponent}
        </div>
    </div>
)

export default Match;